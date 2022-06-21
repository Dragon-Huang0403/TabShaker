import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{
  isDragging: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  ${({ isDragging, theme }) =>
    isDragging &&
    css`
      background: white;
      border: 2px solid ${theme.color};
      border-radius: ${theme.borderRadius}px;
    `}
`;

interface DraggerProps {
  gridUnit: number;
  handleOnDrag: (columnsDiff: number, rowsDiff: number, status: string) => void;
  updateDragger: boolean;
  isDragging: boolean;
  setIsDragging: (bool: boolean) => void;
}

function Dragger({
  gridUnit,
  handleOnDrag,
  updateDragger,
  isDragging,
  setIsDragging,
}: DraggerProps) {
  const onDragStartMousePosition = useRef({ x: 0, y: 0 });

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    const x = e.clientX;
    const y = e.clientY;
    const columnsDiff = Math.round(
      (x - onDragStartMousePosition.current.x) / gridUnit,
    );
    const rowsDiff = Math.round(
      (y - onDragStartMousePosition.current.y) / gridUnit,
    );
    if (columnsDiff || rowsDiff) {
      handleOnDrag(columnsDiff, rowsDiff, 'end');
    }
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    onDragStartMousePosition.current.x = e.clientX;
    onDragStartMousePosition.current.y = e.clientY;
  };

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (
      onDragStartMousePosition.current.x === 0 &&
      onDragStartMousePosition.current.y === 0
    ) {
      onDragStartMousePosition.current.x = e.clientX;
      onDragStartMousePosition.current.y = e.clientY;
    }
    const x = e.clientX;
    const y = e.clientY;
    const columnsDiff = Math.round(
      (x - onDragStartMousePosition.current.x) / gridUnit,
    );
    const rowsDiff = Math.round(
      (y - onDragStartMousePosition.current.y) / gridUnit,
    );
    if (columnsDiff || rowsDiff) {
      handleOnDrag(columnsDiff, rowsDiff, 'dragging');
    }
  };

  useEffect(() => {
    onDragStartMousePosition.current.x = 0;
    onDragStartMousePosition.current.y = 0;
  }, [updateDragger]);

  return (
    <Wrapper
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      draggable
      isDragging={isDragging}
    />
  );
}

export default Dragger;
