import React, { ReactElement, useRef } from 'react';
import styled from 'styled-components';
import GridItem from './GridItem';
import type { GridItemData, GridItemPosition } from '../types/GridLayoutTypes';

const Wrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;

type GridLayoutProps = {
  layout: GridItemData[];
  children: React.ReactNode;
  onPositionChange: (newPosition: GridItemPosition, id: string) => void;
};

function GridLayout({ children, layout, onPositionChange }: GridLayoutProps) {
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const renderGridItem = (child: ReactElement) => {
    const childId = child.key;
    const layoutItem = layout.find((item) => item.id === childId)!;
    return (
      <GridItem
        position={layoutItem.position}
        onPositionChange={onPositionChange}
        bound={gridWrapperRef.current!}
        gridUnit={50}
      >
        {child}
      </GridItem>
    );
  };

  return (
    <Wrapper ref={gridWrapperRef}>
      {React.Children.map(children, (child) =>
        renderGridItem(child as ReactElement),
      )}
    </Wrapper>
  );
}

export default GridLayout;
