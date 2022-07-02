import React, { ReactElement, useState, useEffect, useRef } from 'react';
import type { DraggerData } from '../../types/GridLayoutTypes';
import { snapToGrid } from '../utils/positionFn';

type DraggerProps = {
  children: ReactElement;
  gridUnit?: number;
  disable?: boolean;
  onDrag: (e: MouseEvent, draggerData: DraggerData) => void;
  onDragStart?: (e: React.MouseEvent) => void;
  onDragEnd?: (e: MouseEvent) => void;
};

function Dragger(props: DraggerProps) {
  const {
    children,
    gridUnit,
    disable,
    onDrag,
    onDragStart,
    onDragEnd,
    ...otherProps
  } = props;
  const [isDragging, setIsDragging] = useState(false);
  const lastX = useRef(NaN);
  const lastY = useRef(NaN);
  const handleOnDragStart = (e: React.MouseEvent) => {
    if (disable) {
      return;
    }
    setIsDragging(true);
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    if (onDragStart) {
      onDragStart(e);
    }
  };
  const handleOnDragStop = (e: MouseEvent) => {
    setIsDragging(false);
    lastX.current = NaN;
    lastY.current = NaN;
    if (onDragEnd) {
      onDragEnd(e);
    }
  };
  const handleOnDrag = (e: MouseEvent) => {
    if (!isDragging) return;
    let deltaX = e.clientX - lastX.current;
    let deltaY = e.clientY - lastY.current;
    e.preventDefault();
    e.stopPropagation();
    if (gridUnit) {
      [deltaX, deltaY] = snapToGrid(gridUnit, deltaX, deltaY);
    }
    const draggerData = {
      deltaX,
      deltaY,
      lastX: lastX.current,
      lastY: lastY.current,
    };
    onDrag(e, draggerData);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    handleOnDragStart(e);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    handleOnDragStop(e.nativeEvent);
  };

  useEffect(() => {
    if (!isDragging) return undefined;
    document.addEventListener('mousemove', handleOnDrag);
    document.addEventListener('mouseup', handleOnDragStop);

    return () => {
      document.removeEventListener('mousemove', handleOnDrag);
      document.removeEventListener('mouseup', handleOnDragStop);
    };
  }, [isDragging]);

  return React.cloneElement(children, {
    ...otherProps,
    onMouseDown,
    onMouseUp,
  });
}

export default Dragger;
