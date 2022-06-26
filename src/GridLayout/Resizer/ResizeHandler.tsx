import React from 'react';
import styled from 'styled-components';
import Dragger from '../Dragger';
import type {
  DraggerData,
  ResizerDirections,
} from '../../types/GridLayoutTypes';

const resizerStyles = {
  n: {
    height: '10px',
    width: '100%',
    top: '-5px',
    left: '0px',
    cursor: 'n-resize',
  },
  s: {
    height: '10px',
    width: '100%',
    bottom: '-5px',
    left: '0px',
    cursor: 's-resize',
  },
  w: {
    height: '100%',
    width: '10px',
    left: '-5px',
    top: '0px',
    cursor: 'e-resize',
  },
  e: {
    height: '100%',
    width: '10px',
    right: '-5px',
    top: '0px',
    cursor: 'w-resize',
  },
  nw: {
    width: '20px',
    height: '20px',
    top: '-10px',
    left: '-10px',
    cursor: 'nw-resize',
  },
  ne: {
    width: '20px',
    height: '20px',
    top: '-10px',
    right: '-10px',
    cursor: 'ne-resize',
  },
  sw: {
    width: '20px',
    height: '20px',
    bottom: '-10px',
    left: '-10px',
    cursor: 'sw-resize',
  },
  se: {
    width: '20px',
    height: '20px',
    bottom: '-10px',
    right: '-10px',
    cursor: 'se-resize',
  },
} as const;

const Wrapper = styled.div`
  position: absolute;
`;

type ResizeHandlerProp = {
  direction: ResizerDirections;
  onResize: (draggerData: DraggerData) => void;
  onResizingStart: (e: MouseEvent) => void;
  onResizingEnd: (e: MouseEvent) => void;
};

function ResizeHandler({
  direction,
  onResize,
  onResizingStart,
  onResizingEnd,
}: ResizeHandlerProp) {
  const style = { ...resizerStyles[direction] };
  return (
    <Dragger
      onDrag={onResize}
      onDragStart={onResizingStart}
      onDragEnd={onResizingEnd}
    >
      <Wrapper style={style} />
    </Dragger>
  );
}

export default ResizeHandler;
