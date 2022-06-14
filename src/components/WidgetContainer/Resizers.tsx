/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import Resizer, { TDirection } from './Resizer';
import Dot from './Dot';
import defaultTheme from './defaultTheme';

interface IWrapperStyle {
  width: number;
  height: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const directions = [
  'top',
  'bottom',
  'left',
  'right',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
] as const;

const dotPositions = ['top', 'bottom', 'left', 'right'] as const;

const Wrapper = styled.div`
  position: absolute;
  ${({ theme }) => css`
    border: ${`${theme.borderSize}px solid ${theme.color}`};
    border-radius: ${theme.borderRadius}px;
  `}
`;

const fixedPosition = {
  top: ['bottom', ''],
  bottom: ['top', ''],
  left: ['', 'right'],
  right: ['', 'left'],
  topLeft: ['bottom', 'right'],
  topRight: ['bottom', 'left'],
  bottomLeft: ['top', 'right'],
  bottomRight: ['top', 'left'],
} as const;

interface IResizersProps {
  defaultWidth: number;
  defaultHeight: number;
}

function Resizers({ defaultWidth, defaultHeight }: IResizersProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [resizeDirection, setResizeDirection] = useState<TDirection | null>(
    null,
  );
  const clientXRef = useRef(0);
  const clientYRef = useRef(0);
  const startedXSize = useRef(0);
  const startedYSize = useRef(0);

  const onMouseMove = (e: MouseEvent) => {
    // eslint-disable-next-line default-case
    switch (resizeDirection) {
      case 'top':
        setHeight(clientYRef.current - e.clientY + startedYSize.current);
        return;
      case 'bottom':
        setHeight(e.clientY - clientYRef.current + startedYSize.current);
        return;
      case 'right':
        setWidth(e.clientX - clientXRef.current + startedXSize.current);
        return;
      case 'left':
        setWidth(clientXRef.current - e.clientX + startedXSize.current);
        return;
      case 'topLeft':
        setWidth(clientXRef.current - e.clientX + startedXSize.current);
        setHeight(clientYRef.current - e.clientY + startedYSize.current);
        return;
      case 'topRight':
        setWidth(e.clientX - clientXRef.current + startedXSize.current);
        setHeight(clientYRef.current - e.clientY + startedYSize.current);
        return;
      case 'bottomLeft':
        setWidth(clientXRef.current - e.clientX + startedXSize.current);
        setHeight(e.clientY - clientYRef.current + startedYSize.current);
        return;
      case 'bottomRight':
        setWidth(e.clientX - clientXRef.current + startedXSize.current);
        setHeight(e.clientY - clientYRef.current + startedYSize.current);
    }
  };

  const onResizeStart = (
    e: React.MouseEvent<HTMLDivElement>,
    direction: TDirection,
  ) => {
    clientXRef.current = e.clientX;
    clientYRef.current = e.clientY;
    const target = e.target as HTMLDivElement;
    const parent = target.parentNode as HTMLDivElement;
    startedXSize.current = parent.clientWidth;
    startedYSize.current = parent.clientHeight;
    setResizeDirection(direction);
  };

  const onMouseUp = (e: MouseEvent) => {
    setResizeDirection(null);
  };

  useEffect(() => {
    if (!resizeDirection) return undefined;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const removeEvent = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    return removeEvent;
  }, [resizeDirection]);

  const wrapperStyle: IWrapperStyle = {
    width,
    height,
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  };

  if (resizeDirection) {
    const [verPosition, horPosition] = fixedPosition[resizeDirection];
    if (verPosition) {
      wrapperStyle[verPosition] = `${startedYSize.current - defaultHeight}px`;
    }
    if (horPosition) {
      wrapperStyle[horPosition] = `${startedXSize.current - defaultWidth}px`;
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper style={wrapperStyle}>
        {directions.map((direction, index) => (
          <Resizer
            direction={direction}
            onResizeStart={onResizeStart}
            key={index}
          />
        ))}
        {dotPositions.map((position, index) => (
          <Dot key={index} position={position} />
        ))}
      </Wrapper>
    </ThemeProvider>
  );
}

export default Resizers;
