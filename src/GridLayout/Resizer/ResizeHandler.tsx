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
    top: '0px',
    left: '0px',
    cursor: 'n-resize',
  },
  s: {
    height: '10px',
    width: '100%',
    bottom: '0px',
    left: '0px',
    cursor: 's-resize',
  },
  w: {
    height: '100%',
    width: '10px',
    left: '0px',
    top: '0px',
    cursor: 'e-resize',
  },
  e: {
    height: '100%',
    width: '10px',
    right: '0px',
    top: '0px',
    cursor: 'w-resize',
  },
  nw: {
    width: '20px',
    height: '20px',
    top: '0px',
    left: '0px',
    cursor: 'nw-resize',
  },
  ne: {
    width: '20px',
    height: '20px',
    top: '0px',
    right: '0px',
    cursor: 'ne-resize',
  },
  sw: {
    width: '20px',
    height: '20px',
    bottom: '0px',
    left: '0px',
    cursor: 'sw-resize',
  },
  se: {
    width: '20px',
    height: '20px',
    bottom: '0px',
    right: '0px',
    cursor: 'se-resize',
  },
} as const;

const Wrapper = styled.div`
  position: absolute;
`;

type ResizeHandlerProp = {
  direction: ResizerDirections;
  onResize: (e: MouseEvent, draggerData: DraggerData) => void;
  onResizingStart: (e: React.MouseEvent) => void;
  onResizingEnd: (e: MouseEvent) => void;
  gridUnit: number | undefined;
};

function ResizeHandler({
  direction,
  onResize,
  onResizingStart,
  onResizingEnd,
  gridUnit,
}: ResizeHandlerProp) {
  const style = { ...resizerStyles[direction] };
  return (
    <Dragger
      onDrag={onResize}
      onDragStart={onResizingStart}
      onDragEnd={onResizingEnd}
      gridUnit={gridUnit}
    >
      <Wrapper style={style} />
    </Dragger>
  );
}

export default ResizeHandler;
