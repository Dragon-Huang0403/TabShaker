import React, { ReactElement, useState, useEffect, useRef } from 'react';
import type { DraggerData } from '../../types/GridLayoutTypes';
import { snapToGrid } from '../utils/positionFn';

type DraggerProps = {
  children: ReactElement;
  onDrag: (draggerData: DraggerData) => void;
  gridUnit?: number;
};

function Dragger({ children, onDrag, gridUnit }: DraggerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const lastX = useRef(NaN);
  const lastY = useRef(NaN);

  const handleOnDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastX.current = e.clientX;
    lastY.current = e.clientY;
  };
  const handleOnDrag = (e: MouseEvent) => {
    let deltaX = e.clientX - lastX.current;
    let deltaY = e.clientY - lastY.current;
    if (gridUnit) {
      [deltaX, deltaY] = snapToGrid(gridUnit, deltaX, deltaY);
    }
    const draggerData = {
      deltaX,
      deltaY,
      lastX: lastX.current,
      lastY: lastY.current,
    };
    onDrag(draggerData);
  };

  const handleOnDragStop = () => {
    setIsDragging(false);
    lastX.current = NaN;
    lastY.current = NaN;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    handleOnDragStart(e);
  };

  const onMouseUp = () => {
    handleOnDragStop();
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

  return React.cloneElement(children, { onMouseDown, onMouseUp });
}

export default Dragger;
