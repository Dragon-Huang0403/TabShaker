/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GridItem from './GridItem';
import type {
  DraggerData,
  Layout,
  LayoutItem,
  Layouts,
  Limit,
} from '../types/GridLayoutTypes';
import { findLayoutItem } from './utils/other';
import { canElementMove, moveElement } from './utils/positionFn';

const Wrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;

const defaultLayouts: Layouts = {
  lg: [
    { x: 0, y: 0, w: 10, h: 10 },
    { x: 12, y: 2, w: 10, h: 10 },
  ],
};
const defaultLimits: Limit[] = [
  { minW: 3, maxW: 12, minH: 3, maxH: 12 },
  { minW: 3, maxW: 12, minH: 3, maxH: 12 },
];

type GridLayoutProps = {
  children: React.ReactNode;
};

function GridLayout({ children }: GridLayoutProps) {
  const [layouts, setLayouts] = useState(defaultLayouts);
  const [gridLayoutWidth, setGridLayoutWidget] = useState(1280);
  const gridRef = useRef<HTMLDivElement>(null);
  const cols = 40;
  const gridUnit = [gridLayoutWidth / cols, gridLayoutWidth / cols];
  const screenSize = 'lg';
  const currentLayout = layouts[screenSize];
  const latestCurrentLayout = useRef(currentLayout);
  const updateLayout = (layout: Layout) => {
    const newLayouts = { ...layouts };
    newLayouts[screenSize] = layout;
    setLayouts(newLayouts);
  };

  const updateLayoutItem = (layoutItem: LayoutItem, id: string | number) => {
    let newLayout = layouts[screenSize];
    if (typeof id === 'number') {
      newLayout = newLayout.map((item, i) => (i === id ? layoutItem : item));
    } else {
      newLayout = newLayout.map((item) => (item.id === id ? layoutItem : item));
    }
    updateLayout(newLayout);
  };
  const onDrag = (
    id: string,
    e: MouseEvent,
    draggerData: DraggerData,
    layoutItem: LayoutItem,
  ) => {
    const newLayout = moveElement(
      currentLayout,
      { ...layoutItem, id },
      latestCurrentLayout.current,
      cols,
    );
    latestCurrentLayout.current = newLayout;
    updateLayout(newLayout);
  };
  const onDragStart = () => {
    latestCurrentLayout.current = currentLayout;
  };
  const onResize = (id: string, newLayoutItem: LayoutItem) => {
    if (!canElementMove(currentLayout, { ...newLayoutItem, id })) return;
    updateLayoutItem(newLayoutItem, id);
  };
  const renderGridItem = (child: ReactElement, index: number) => {
    const id = child.key as string;
    if (!id) return null;
    const layoutItem = findLayoutItem(currentLayout, index)!;
    if (!layoutItem.id) {
      updateLayoutItem({ ...layoutItem, id }, index);
      return null;
    }

    return (
      <GridItem
        layoutItem={layoutItem}
        limit={defaultLimits[index]}
        bound={gridRef.current!}
        gridUnit={gridUnit}
        onDrag={onDrag}
        onResize={onResize}
        onDragStart={onDragStart}
      >
        {child}
      </GridItem>
    );
  };
  useEffect(() => {
    const updateGridLayoutWidth = () => {
      if (!gridRef.current) return;
      setGridLayoutWidget(gridRef.current.offsetWidth);
    };
    window.addEventListener('resize', updateGridLayoutWidth);
    updateGridLayoutWidth();
    return () => {
      window.removeEventListener('resize', updateGridLayoutWidth);
    };
  }, []);

  return (
    <Wrapper ref={gridRef}>
      {React.Children.map(children, (child, index) =>
        renderGridItem(child as ReactElement, index),
      )}
    </Wrapper>
  );
}

export default GridLayout;
