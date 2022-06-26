import React, { ReactElement } from 'react';
import ResizerHandler from './ResizeHandler';
import type {
  DraggerData,
  GridItemPosition,
  ResizerDirections,
} from '../../types/GridLayoutTypes';

const resizerDirections: ResizerDirections[] = [
  's',
  'w',
  'e',
  'n',
  'sw',
  'nw',
  'se',
  'ne',
];

type ResizerProps = {
  children: ReactElement;
  onResize: (newPosition: GridItemPosition) => void;
  position: GridItemPosition;
  onResizingStart: (e: MouseEvent) => void;
  onResizingEnd: (e: MouseEvent) => void;
};

function Resizer(props: ResizerProps) {
  const {
    children,
    onResize,
    onResizingStart,
    onResizingEnd,
    position,
    ...otherProps
  } = props;
  const handleResize = (
    direction: ResizerDirections,
    draggerData: DraggerData,
  ) => {
    let { x, y, w, h } = position;
    const axisV = direction[0];
    const axisH = direction[direction.length - 1];
    let { deltaX, deltaY } = draggerData;
    if (axisH === 'w') {
      x += deltaX;
      deltaX = -deltaX;
    }
    if (axisV === 'n') {
      y += deltaY;
      deltaY = -deltaY;
    }
    if (axisH === 'w' || axisH === 'e') {
      w = position.w + deltaX;
    }
    if (axisV === 'n' || axisV === 's') {
      h = position.h + deltaY;
    }
    const newPosition = { x, y, w, h };
    onResize(newPosition);
  };
  return React.cloneElement(children, {
    ...otherProps,
    children: [
      children.props.children,
      ...resizerDirections.map((direction) => (
        <ResizerHandler
          direction={direction}
          key={direction}
          onResize={(draggerData: DraggerData) => {
            handleResize(direction, draggerData);
          }}
          onResizingStart={onResizingStart}
          onResizingEnd={onResizingEnd}
        />
      )),
    ],
  });
}

export default Resizer;
