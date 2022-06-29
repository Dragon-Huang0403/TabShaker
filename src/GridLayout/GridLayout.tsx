/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GridItem from './GridItem';
import type {
  DraggerData,
  Layout,
  LayoutItem,
  Layouts,
  Position,
} from '../types/GridLayoutTypes';
import { findLayoutItem } from './utils/other';
import {
  canElementMove,
  moveElement,
  getAvailableLayoutItem,
} from './utils/positionFn';
import { WidgetData } from '../types/WidgetTypes';

const Wrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;

const Placeholder = styled.div`
  padding: 10px;
  background: #0007;
  background-clip: content-box;
  width: 100%;
  height: 100%;
`;

type GridLayoutProps = {
  children: React.ReactNode;
  widgets: WidgetData[];
  layouts: Layouts;
  setLayouts: React.Dispatch<Layouts>;
};

function GridLayout({
  children,
  widgets,
  layouts,
  setLayouts,
}: GridLayoutProps) {
  const [gridLayoutWidth, setGridLayoutWidget] = useState(1280);
  const gridRef = useRef<HTMLDivElement>(null);
  const cols = 40;
  const gridUnit = [gridLayoutWidth / cols, gridLayoutWidth / cols];
  const screenSize = 'lg';
  const currentLayout = layouts[screenSize];
  const latestCurrentLayout = useRef(currentLayout);
  const [placeholder, setPlaceHolder] = useState<LayoutItem | null>(null);
  const updateLayout = (layout: Layout) => {
    const newLayouts = { ...layouts };
    newLayouts[screenSize] = layout;
    setLayouts(newLayouts);
  };

  const updateLayoutItem = (layoutItem: LayoutItem) => {
    const newLayout = layouts[screenSize].map((item) =>
      item.id === layoutItem.id ? { ...layoutItem } : item,
    );
    updateLayout(newLayout);
  };
  const onDrag = (
    e: MouseEvent,
    draggerData: DraggerData,
    layoutItem: LayoutItem,
  ) => {
    const newLayout = moveElement(
      currentLayout,
      layoutItem,
      latestCurrentLayout.current,
      cols,
    );
    const newLayoutItem = findLayoutItem(newLayout, layoutItem.id);
    if (newLayoutItem && canElementMove(newLayout, newLayoutItem)) {
      setPlaceHolder(newLayoutItem);
    }
    latestCurrentLayout.current = newLayout;
    updateLayout(newLayout);
  };
  const onDragEnd = () => {
    if (placeholder) {
      updateLayoutItem(placeholder);
    }
    setPlaceHolder(null);
  };
  const onResize = (layoutItem: LayoutItem) => {
    if (!canElementMove(currentLayout, layoutItem)) return;
    updateLayoutItem(layoutItem);
  };
  const renderGridItem = (child: ReactElement) => {
    const id = child.key as string;
    if (!id) return null;
    const layoutItem = findLayoutItem(currentLayout, id)!;
    if (!layoutItem) return null;
    const targetWidget = widgets.find((widget) => widget.id === id);
    if (!targetWidget) return null;
    const { limit } = targetWidget;

    return (
      <GridItem
        key={id}
        layoutItem={layoutItem}
        limit={limit}
        bound={gridRef.current!}
        gridUnit={gridUnit}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onResize={onResize}
      >
        {child}
      </GridItem>
    );
  };

  const renderPlaceHolder = () => {
    if (!placeholder) return null;
    const { id } = placeholder;
    const targetWidget = widgets.find((widget) => widget.id === id);
    if (!targetWidget) return null;
    const { limit } = targetWidget;
    return (
      <GridItem
        layoutItem={placeholder}
        limit={limit}
        bound={gridRef.current!}
        gridUnit={gridUnit}
        onResize={onResize}
        onDrag={onDrag}
      >
        <Placeholder />
      </GridItem>
    );
  };

  useEffect(() => {
    const newLayouts = { ...layouts };
    newLayouts[screenSize] = [...newLayouts[screenSize]];
    let shouldUpdate = false;
    widgets.forEach((widget) => {
      const { defaultLayout, id } = widget;
      if (currentLayout.some((item) => item.id === id)) return;
      shouldUpdate = true;
      const availableLayoutItem = getAvailableLayoutItem(currentLayout, cols, {
        ...defaultLayout,
        id,
      });
      newLayouts[screenSize].push(availableLayoutItem);
    });
    if (shouldUpdate) {
      setLayouts(newLayouts);
    }
  }, [widgets, currentLayout, screenSize]);

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

  useEffect(() => {
    latestCurrentLayout.current = currentLayout;
  }, [currentLayout]);

  return (
    <Wrapper ref={gridRef}>
      {renderPlaceHolder()}
      {React.Children.map(children, (child) =>
        renderGridItem(child as ReactElement),
      )}
    </Wrapper>
  );
}

export default GridLayout;
