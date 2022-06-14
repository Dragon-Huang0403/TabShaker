/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import Resizer from './Resizer';

const directions = ['top', 'bottom', 'left', 'right'] as const;

interface WrapperProps {
  width: number;
  height: number;
}

const Wrapper = styled.div<WrapperProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: black;
  color: white;
  border-radius: 20px;
  position: relative;
`;

function WidgetContainer() {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  return (
    <Wrapper width={width} height={height}>
      {directions.map((direction) => (
        <Resizer direction={direction} />
      ))}
      WidgetContainer
    </Wrapper>
  );
}

export default WidgetContainer;
