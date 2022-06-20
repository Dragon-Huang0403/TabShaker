/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Resizer from './Resizer';
import { hasDirection } from './util';
import type { Direction } from './types';
import Dot from './Dot';

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

const Wrapper = styled.div<{ isResizing: boolean }>`
  position: absolute;
  ${({ theme, isResizing }) =>
    isResizing &&
    css`
      border: ${`${theme.borderSize}px solid ${theme.color}`};
      border-radius: ${theme.borderRadius}px;
    `}
`;

interface FixedPositionStyle {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface ResizersStyle extends FixedPositionStyle {
  width: number;
  height: number;
}

function getFixedPositionStyle(direction: Direction | null) {
  if (!direction) return {};
  const style: FixedPositionStyle = {};
  if (hasDirection('top', direction)) style.bottom = 0;
  if (hasDirection('bottom', direction)) style.top = 0;
  if (hasDirection('left', direction)) style.right = 0;
  if (hasDirection('right', direction)) style.left = 0;
  return style;
}

interface ResizersProps {
  defaultWidth: number;
  defaultHeight: number;
  gridUnit: number;
  handleOnSizeChange: (
    columnsDiff: number,
    rowsDiff: number,
    direction: Direction,
  ) => void;
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
  const [direction, setDirection] = useState<Direction | null>(null);
  const onStartMousePosition = useRef({ x: 0, y: 0 });

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!direction) return;
    const clientX = e.clientX > 0 ? e.clientX : 0;
    const clientY = e.clientY > 0 ? e.clientY : 0;
    const heightDiff = onStartMousePosition.current.y - clientY;
    const widthDiff = onStartMousePosition.current.x - clientX;

    if (hasDirection('top', direction)) {
      setHeight(heightDiff + defaultHeight);
    }
    if (hasDirection('bottom', direction)) {
      setHeight(defaultHeight - heightDiff);
    }
    if (hasDirection('left', direction)) {
      setWidth(widthDiff + defaultWidth);
    }
    if (hasDirection('right', direction)) {
      setWidth(defaultWidth - widthDiff);
    }
  };

  const onMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    newDirection: Direction,
  ) => {
    onStartMousePosition.current.x = e.clientX;
    onStartMousePosition.current.y = e.clientY;
    setDirection(newDirection);
    setIsResizing(true);
  };

  const onMouseUp = () => {
    setIsResizing(false);
    setDirection(null);
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
    setHeight(defaultHeight);
    setWidth(defaultWidth);
  }, [defaultWidth, defaultHeight, isResizing]);

  useEffect(() => {
    if (!direction) return;
    if (!isResizing) return;
    const columnsDiff = Math.floor((width - defaultWidth) / gridUnit);
    const rowsDiff = Math.floor((height - defaultHeight) / gridUnit);
    if (columnsDiff || rowsDiff) {
      handleOnSizeChange(columnsDiff, rowsDiff, direction);
    }
  }, [direction, width, height, isResizing]);

  const fixedPositionStyle = getFixedPositionStyle(direction);

  const style: ResizersStyle = {
    ...fixedPositionStyle,
    width,
    height,
  };

  return (
    <Wrapper style={style} isResizing={isResizing}>
      {directions.map((dir, index) => (
        <Resizer direction={dir} onResizeStart={onMouseDown} key={index} />
      ))}
      {isResizing &&
        dotPositions.map((position, index) => (
          <Dot key={index} position={position} />
        ))}
    </Wrapper>
  );
}

export default Resizers;
