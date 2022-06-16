/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Resizer from './Resizer';
import type { TDirection } from './Resizer';
import Dot from './Dot';

interface IWrapperStyle {
  width: number;
  height: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
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

export type THandleOnSizeChange = (
  widthDiff: number,
  heightDiff: number,
  resizeDirection: TDirection,
) => void;

interface ResizersProps {
  defaultWidth: number;
  defaultHeight: number;
  gridUnit: number;
  handleOnSizeChange: THandleOnSizeChange;
}

function Resizers({
  defaultWidth,
  defaultHeight,
  gridUnit,
  handleOnSizeChange,
}: ResizersProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<TDirection | null>(
    null,
  );
  const onStartMousePositionX = useRef(0);
  const onStartMousePositionY = useRef(0);

  const onMouseMove = (e: MouseEvent) => {
    const clientX = e.clientX > 0 ? e.clientX : 0;
    const clientY = e.clientY > 0 ? e.clientY : 0;
    const heightDiff = onStartMousePositionY.current - clientY;
    const widthDiff = onStartMousePositionX.current - clientX;
    // eslint-disable-next-line default-case
    switch (resizeDirection) {
      case 'top':
        setHeight(heightDiff + defaultHeight);
        return;
      case 'bottom':
        setHeight(defaultHeight - heightDiff);
        return;
      case 'right':
        setWidth(defaultWidth - widthDiff);
        return;
      case 'left':
        setWidth(widthDiff + defaultWidth);
        return;
      case 'topLeft':
        setWidth(widthDiff + defaultWidth);
        setHeight(heightDiff + defaultHeight);
        return;
      case 'topRight':
        setWidth(defaultWidth - widthDiff);
        setHeight(heightDiff + defaultHeight);
        return;
      case 'bottomLeft':
        setWidth(widthDiff + defaultWidth);
        setHeight(defaultHeight - heightDiff);
        return;
      case 'bottomRight':
        setWidth(defaultWidth - widthDiff);
        setHeight(defaultHeight - heightDiff);
    }
  };

  const onResizeStart = (
    e: React.MouseEvent<HTMLDivElement>,
    direction: TDirection,
  ) => {
    onStartMousePositionX.current = e.clientX;
    onStartMousePositionY.current = e.clientY;
    setResizeDirection(direction);
    setIsResizing(true);
  };

  const onMouseUp = (e: MouseEvent) => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (!isResizing) return undefined;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const removeEvent = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    return removeEvent;
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) return;
    if (!resizeDirection) return;
    const widthDiff = Math.round((width - defaultWidth) / gridUnit);
    const heightDiff = Math.round((height - defaultHeight) / gridUnit);
    if (widthDiff || heightDiff) {
      handleOnSizeChange(widthDiff, heightDiff, resizeDirection);
    }
    setResizeDirection(null);
    setWidth(defaultWidth);
    setHeight(defaultHeight);
  }, [resizeDirection, width, height, isResizing]);

  useEffect(() => {
    setWidth(defaultWidth);
    setHeight(defaultHeight);
  }, [defaultWidth, defaultHeight]);

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
    if (verPosition === 'top') {
      wrapperStyle[verPosition] = 0;
    }
    if (verPosition === 'bottom') {
      wrapperStyle[verPosition] = 0;
    }
    if (horPosition === 'left') {
      wrapperStyle[horPosition] = 0;
    }
    if (horPosition === 'right') {
      wrapperStyle[horPosition] = 0;
    }
  }

  return (
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
  );
}

export default Resizers;
