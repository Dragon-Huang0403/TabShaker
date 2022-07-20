import React, { useRef, ReactElement, useState } from 'react';
import styled, { css } from 'styled-components';

import Resizer from './Resizer';
import Dragger from './Dragger';
import { getBoundPosition, getPosition } from './utils/positionFn';
import {
  createCSSTransform,
  calcXY,
  getConstraint,
  calcGridItemLayout,
} from './utils/other';

import type {
  Position,
  DraggerData,
  Limit,
  LayoutItem,
} from '../types/GridLayoutTypes';

const Wrapper = styled.div<{ isMoving: boolean }>`
  position: absolute;
  user-select: none;
  ${({ isMoving }) =>
    isMoving
      ? css`
          opacity: 0.8;
        `
      : css`
          transition: transform 0.22s;
        `}

  cursor: inherit;

  &:active {
    cursor: move;
  }
`;

const defaultProps = {
  onDragEnd: () => {},
};

type GridItemProp = {
  layoutItem: LayoutItem;
  limit: Limit;
  children: ReactElement;
  bound: HTMLDivElement | null;
  gridUnit: number[];
  id: string;
  onDrag: (
    e: MouseEvent,
    draggerData: DraggerData,
    updatedLayoutItem: LayoutItem,
  ) => void;
  onDragEnd?: () => void;
  onResize: (updatedLayoutItem: LayoutItem) => void;
} & typeof defaultProps;

function GridItem(props: GridItemProp) {
  const {
    children,
    layoutItem,
    limit,
    bound,
    gridUnit,
    id,
    onDrag,
    onDragEnd,
    onResize,
  } = props;
  const [isResizing, setIsResizing] = useState(false);
  const [movingPosition, setMovingPosition] = useState<Position | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const position = movingPosition || getPosition(layoutItem, gridUnit);
  const constraint = getConstraint(limit, gridUnit);
  const style = createCSSTransform(position);
  const { left, top, width, height } = position;

  const handleOnDrag = (e: MouseEvent, draggerData: DraggerData) => {
    const { deltaX, deltaY } = draggerData;
    let newLeft = left + deltaX;
    let newTop = top + deltaY;
    if (bound) {
      [newLeft, newTop] = getBoundPosition(
        nodeRef.current!,
        bound,
        newLeft,
        newTop,
      );
    }
    const newPosition = { ...position, left: newLeft, top: newTop };
    setMovingPosition(newPosition);
    const [newX, newY] = calcXY(newPosition, gridUnit);
    const updatedLayoutItem = { ...layoutItem, x: newX, y: newY };
    onDrag(e, draggerData, updatedLayoutItem);
  };
  const handleOnDragEnd = () => {
    setMovingPosition(null);
    onDragEnd();
  };
  const handleResize = (newPosition: Position) => {
    setMovingPosition(newPosition);
    const updatedLayoutItem = calcGridItemLayout(newPosition, gridUnit);
    onResize({ ...updatedLayoutItem, id });
  };
  const onResizingStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };
  const onResizingEnd = () => {
    setIsResizing(false);
    setMovingPosition(null);
  };
  return (
    <Dragger
      disable={isResizing}
      onDrag={handleOnDrag}
      onDragEnd={handleOnDragEnd}
    >
      <Resizer
        onResize={handleResize}
        position={position}
        constraint={constraint}
        onResizingStart={onResizingStart}
        onResizingEnd={onResizingEnd}
      >
        <Wrapper ref={nodeRef} style={style} isMoving={!!movingPosition}>
          {React.cloneElement(children, { width, height })}
        </Wrapper>
      </Resizer>
    </Dragger>
  );
}

GridItem.defaultProps = defaultProps;

export default GridItem;
