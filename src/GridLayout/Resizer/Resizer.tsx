import React, { ReactElement, useRef } from 'react';
import ResizerHandler from './ResizeHandler';
import { runConstraint } from '../utils/positionFn';
import type {
  DraggerData,
  Position,
  ResizerDirections,
  Constraint,
} from '../../types/GridLayoutTypes';

const resizerDirections = ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] as const;

type ResizerProps = {
  children: ReactElement;
  position: Position;
  constraint: Constraint;
  onResize: (newPosition: Position) => void;
  onResizingStart: (e: React.MouseEvent) => void;
  onResizingEnd: (e: MouseEvent) => void;
  gridUnit?: number;
};

function Resizer(props: ResizerProps) {
  const {
    children,
    onResize,
    onResizingStart,
    onResizingEnd,
    position,
    gridUnit,
    constraint,
    ...otherProps
  } = props;
  const lastPosition = useRef(position);

  const handleResize = (
    direction: ResizerDirections,
    draggerData: DraggerData,
  ) => {
    let { top, left, width, height } = position;
    const axisV = direction[0];
    const axisH = direction[direction.length - 1];
    let { deltaX, deltaY } = draggerData;
    if (axisH === 'w') {
      deltaX = -deltaX;
    }
    if (axisV === 'n') {
      deltaY = -deltaY;
    }
    if (axisH === 'w' || axisH === 'e') {
      width += deltaX;
    }
    if (axisV === 'n' || axisV === 's') {
      height += deltaY;
    }

    [width, height] = runConstraint(constraint, width, height);
    if (axisH === 'w') {
      left += position.width - width;
    }
    if (axisV === 'n') {
      top += position.height - height;
    }
    const newPosition = { top, left, width, height };
    lastPosition.current = newPosition;
    onResize(newPosition);
  };
  const handleOnResizeStart = (e: React.MouseEvent) => {
    lastPosition.current = position;
    onResizingStart(e);
  };
  return React.cloneElement(children, {
    ...otherProps,
    children: [
      children.props.children,
      ...resizerDirections.map((direction) => (
        <ResizerHandler
          direction={direction}
          key={direction}
          onResize={(e: MouseEvent, draggerData: DraggerData) => {
            handleResize(direction, draggerData);
          }}
          onResizingStart={handleOnResizeStart}
          onResizingEnd={onResizingEnd}
          gridUnit={gridUnit}
        />
      )),
    ],
  });
}

export default Resizer;
