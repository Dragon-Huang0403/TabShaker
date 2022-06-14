import React from 'react';
import styled from 'styled-components';

type TDirection = 'top' | 'bottom' | 'left' | 'right';

interface ISizeBase {
  direction: TDirection;
}

const SizeBase = styled.div<ISizeBase>`
  position: absolute;
  user-select: none;
  ${({ direction }) => direction}: -5px;
`;

const ColSizeBase = styled(SizeBase)`
  width: 10px;
  height: 100%;
  top: 0px;
  cursor: col-resize;
`;

const RowSizeBase = styled(SizeBase)`
  height: 10px;
  width: 100%;
  left: 0px;
  cursor: row-resize;
`;

interface IResizerProps {
  direction: TDirection;
}

function Resizer(props: IResizerProps) {
  const { direction } = props;

  if (direction === 'left' || direction === 'right') {
    return <ColSizeBase direction={direction} />;
  }
  if (direction === 'top' || direction === 'bottom') {
    return <RowSizeBase direction={direction} />;
  }
  return null;
}

export default Resizer;
