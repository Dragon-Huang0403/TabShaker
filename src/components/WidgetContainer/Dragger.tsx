import React, { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color}33;
  position: absolute;
  width: 100%;
  height: 100%;
`;

interface DraggerProps {
  gridUnit: number;
  handleOnMove: (widthDiff: number, heightDiff: number) => void;
}

function Dragger({ gridUnit, handleOnMove }: DraggerProps) {
  const onDragStartMousePosition = useRef({ x: 0, y: 0 });

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const y = e.clientY;
    const widthDiff = Math.round(
      (x - onDragStartMousePosition.current.x) / gridUnit,
    );
    const heightDiff = Math.round(
      (y - onDragStartMousePosition.current.y) / gridUnit,
    );
    if (widthDiff || heightDiff) {
      handleOnMove(widthDiff, heightDiff);
    }
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStartMousePosition.current.x = e.clientX;
    onDragStartMousePosition.current.y = e.clientY;
  };

  return <Wrapper onDragStart={onDragStart} onDragEnd={onDragEnd} draggable />;
}

export default Dragger;
