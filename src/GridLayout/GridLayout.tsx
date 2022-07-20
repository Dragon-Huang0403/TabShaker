import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  Children,
} from 'react';
import styled from 'styled-components';

import GridItem from './GridItem';
import { findLayoutItem } from './utils/other';
import { useEventListener } from '../hooks';
import {
  canElementMove,
  moveElement,
  getAvailableLayoutItem,
  getDefaultLayout,
} from './utils/positionFn';
import { getScreenInfo } from './config';

import type {
  DraggerData,
  Layout,
  LayoutItem,
  Layouts,
  Limit,
  DefaultLayout,
} from '../types/GridLayoutTypes';

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
  layouts: Layouts;
  setLayouts: React.Dispatch<Layouts>;
  getLayoutLimit: (id: string) => Limit;
  getWidgetDefaultLayout: (id: string) => DefaultLayout;
};

function GridLayout({
  children,
  layouts,
  setLayouts,
  getLayoutLimit,
  getWidgetDefaultLayout,
}: GridLayoutProps) {
  const [gridLayoutWidth, setGridLayoutWidth] = useState(
    () => window.innerWidth,
  );
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
    if (canElementMove(currentLayout, layoutItem)) {
      updateLayoutItem(layoutItem);
    }
  };

  useEffect(() => {
    const newLayouts = { ...layouts };
    newLayouts[screenSize] = [...newLayouts[screenSize]];
    let shouldLayoutUpdate = false;
    React.Children.forEach(children as ReactElement[], (child) => {
      const id = child.key as string;
      if (newLayouts[screenSize].some((item) => item.id === id)) return;
      shouldLayoutUpdate = true;
      const widgetDefaultLayout = getWidgetDefaultLayout(id);
      const defaultLayout = getDefaultLayout(
        id,
        newLayouts,
        widgetDefaultLayout,
      );
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

    if (shouldLayoutUpdate) {
      setLayouts(newLayouts);
    }
  }, [Children.count(children), layouts, screenSize]);

  useEventListener('resize', () => {
    if (!gridRef.current) return;
    setGridLayoutWidth(gridRef.current.offsetWidth);
  });

  useEffect(() => {
    latestCurrentLayout.current = currentLayout;
  }, [currentLayout]);

  return (
    <Wrapper ref={gridRef}>
      {gridRef.current && (
        <>
          {placeholder && (
            <GridItem
              key="placeHolder"
              id={placeholder.id}
              layoutItem={placeholder}
              limit={getLayoutLimit(placeholder.id)}
              bound={gridRef.current}
              gridUnit={gridUnit}
              onResize={onResize}
              onDrag={onDrag}
            >
              <Placeholder />
            </GridItem>
          )}
          {React.Children.map(children as ReactElement[], (child) => {
            const id = child.key as string;
            const layoutItem = findLayoutItem(currentLayout, id);
            if (!layoutItem) return null;
            return (
              <GridItem
                key={id}
                id={id}
                layoutItem={layoutItem}
                limit={getLayoutLimit(id)}
                bound={gridRef.current!}
                gridUnit={gridUnit}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                onResize={onResize}
              >
                {child}
              </GridItem>
            );
          })}
        </>
      )}
    </Wrapper>
  );
}

export default GridLayout;
