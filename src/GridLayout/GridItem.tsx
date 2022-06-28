import React, { useRef, ReactElement, useState } from 'react';
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

type GridItemProp = {
  layoutItem: LayoutItem;
  limit: Limit;
  children: ReactElement;
  bound: HTMLDivElement;
  gridUnit: number[];
  onDrag: (
    id: string,
    e: MouseEvent,
    draggerData: DraggerData,
    newLayoutItem: LayoutItem,
  ) => void;
  onDragStart: () => void;
  onResize: (id: string, newLayoutItem: LayoutItem) => void;
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
  const nodeRef = useRef<HTMLElement>(null);
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
    const newLayoutItem = { ...layoutItem, x: newX, y: newY };
    onDrag(id, e, draggerData, newLayoutItem);
  };
  const onDragEnd = () => {
    console.log('onDragEnd');
  };
  const handleResize = (newPosition: Position | null) => {
    if (!newPosition) return;
    console.log(layoutItem);
    const newLayoutItem = calcGridItemLayout(newPosition, gridUnit);
    onResize(id, newLayoutItem);
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
        {React.cloneElement(React.Children.only(children), {
          ref: nodeRef,
          style: {
            ...children.props.style,
            ...style,
          },
        })}
      </Resizer>
    </Dragger>
  );
}

export default GridItem;
