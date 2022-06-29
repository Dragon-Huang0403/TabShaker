import React, { useRef, ReactElement, useState } from 'react';
import styled from 'styled-components';
import Resizer from './Resizer';
import Dragger from './Dragger';
import type {
  Position,
  DraggerData,
  Limit,
  LayoutItem,
} from '../types/GridLayoutTypes';
import { getBoundPosition, getPosition } from './utils/positionFn';
import {
  createCSSTransform,
  calcXY,
  getConstraint,
  calcGridItemLayout,
} from './utils/other';

const Wrapper = styled.div`
  position: absolute;
  user-select: none;
`;

type GridItemProp = {
  layoutItem: LayoutItem;
  limit: Limit;
  children: ReactElement;
  bound: HTMLDivElement;
  gridUnit: number[];
  onDrag: (
    e: MouseEvent,
    draggerData: DraggerData,
    updatedLayoutItem: LayoutItem,
  ) => void;
  onDragStart: () => void;
  onResize: (updatedLayoutItem: LayoutItem) => void;
};

function GridItem(props: GridItemProp) {
  const {
    children,
    layoutItem,
    limit,
    bound,
    gridUnit,
    onDrag,
    onDragStart,
    onResize,
  } = props;
  const [isResizing, setIsResizing] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const id = children.key as string;
  const position = getPosition(layoutItem, gridUnit);
  const constraint = getConstraint(limit, gridUnit);
  const style = createCSSTransform(position);
  const { left, top } = position;

  const handleOnDrag = (e: MouseEvent, draggerData: DraggerData) => {
    const { deltaX, deltaY } = draggerData;
    let newLeft = left + deltaX;
    let newTop = top + deltaY;
    [newLeft, newTop] = getBoundPosition(
      nodeRef.current!,
      bound,
      newLeft,
      newTop,
    );
    const newPosition = { ...position, left: newLeft, top: newTop };
    const [newX, newY] = calcXY(newPosition, gridUnit);
    const updatedLayoutItem = { ...layoutItem, x: newX, y: newY };
    onDrag(e, draggerData, updatedLayoutItem);
  };
  const onDragEnd = () => {};
  const handleResize = (newPosition: Position) => {
    const updatedLayoutItem = calcGridItemLayout(newPosition, gridUnit);
    onResize({ ...updatedLayoutItem, id });
  };
  const onResizingStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };
  const onResizingEnd = () => {
    setIsResizing(false);
  };
  return (
    <Dragger
      onDrag={handleOnDrag}
      disable={isResizing}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Resizer
        onResize={handleResize}
        position={position}
        constraint={constraint}
        onResizingStart={onResizingStart}
        onResizingEnd={onResizingEnd}
      >
        <Wrapper ref={nodeRef} style={style}>
          {children}
        </Wrapper>
      </Resizer>
    </Dragger>
  );
}

export default GridItem;
