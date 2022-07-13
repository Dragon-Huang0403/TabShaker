import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GridItem from './GridItem';
import type {
  DraggerData,
  Layout,
  LayoutItem,
  Layouts,
} from '../types/GridLayoutTypes';
import { findLayoutItem } from './utils/other';
import {
  canElementMove,
  moveElement,
  getAvailableLayoutItem,
  getOtherScreenSizeLayoutItem,
} from './utils/positionFn';
import { WidgetData } from '../types/WidgetTypes';
import { getScreenInfo } from './config';
import { widgetConfig } from '../Widget';

const Wrapper = styled.div`
  position: relative;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Placeholder = styled.div`
  padding: 10px;
  background: ${({ theme }) => theme.color.transparentBlack};
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
  const [screenSize, cols] = getScreenInfo(gridLayoutWidth);
  const gridUnit = [gridLayoutWidth / cols, gridLayoutWidth / cols];
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
    const { type } = targetWidget;
    const { limit } = widgetConfig[type];

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
      const { id } = widget;
      if (newLayouts[screenSize].some((item) => item.id === id)) return;
      shouldUpdate = true;
      const defaultLayout = getOtherScreenSizeLayoutItem(id, newLayouts) || {
        ...widget.defaultLayout,
        x: 0,
        y: 0,
      };
      const availableLayoutItem = getAvailableLayoutItem(
        newLayouts[screenSize],
        cols,
        {
          ...defaultLayout,
          id,
        },
      );
      newLayouts[screenSize].push(availableLayoutItem);
    });
    if (shouldUpdate) {
      setLayouts(newLayouts);
    }
  }, [widgets, layouts, screenSize]);

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
