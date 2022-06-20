import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Resizers from './Resizers';
import Dragger from './Dragger';
import globalTheme from '../../theme';
import type { Direction, WidgetSizeLimit, WidgetSize } from './types';
import defaultTheme from './defaultTheme';
import { getNewWidgetSize } from './util';

const Wrapper = styled.div`
  user-select: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface WidgetContainerProps extends WidgetSize {
  children: JSX.Element;
  onChange: (newWidgetSize: WidgetSize) => void;
  canWidgetMove: (newWidgetSize: WidgetSize) => boolean;
  handleConflict: (newWidgetSize: WidgetSize) => void;
}

const limit: WidgetSizeLimit = {
  maxRows: 5,
  minRows: 2,
  maxColumns: 5,
  minColumns: 2,
};

function WidgetContainer({
  rowStart,
  rows,
  columnStart,
  columns,
  children,
  onChange,
  canWidgetMove,
  handleConflict,
}: WidgetContainerProps) {
  const { gridUnit } = globalTheme;
  const defaultSize = { rowStart, rows, columnStart, columns };
  const [widgetSize, setWidgetSize] = useState(defaultSize);
  const [updateDragger, setUpdateDragger] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleOnSizeChange = (
    columnsDiff: number,
    rowsDiff: number,
    direction: Direction,
  ) => {
    const changes = { columnsDiff, rowsDiff, direction };
    const newWidgetSize = getNewWidgetSize(widgetSize, limit, changes);
    if (!canWidgetMove(newWidgetSize)) return;
    setWidgetSize(newWidgetSize);
  };

  const handleOnDrag = (
    columnsDiff: number,
    rowsDiff: number,
    status: string,
  ) => {
    const newRowStart = rowStart + rowsDiff >= 1 ? rowStart + rowsDiff : 1;
    const newColumnStart =
      columnStart + columnsDiff >= 1 ? columnStart + columnsDiff : 1;
    const newWidgetSize = {
      ...widgetSize,
      rowStart: newRowStart,
      columnStart: newColumnStart,
    };
    if (status === 'end' && canWidgetMove(newWidgetSize)) {
      setWidgetSize(newWidgetSize);
      return;
    }
    handleConflict(newWidgetSize);
  };

  useEffect(() => {
    onChange(widgetSize);
  }, [widgetSize]);

  useEffect(() => {
    setWidgetSize({ rowStart, columnStart, rows, columns });
    setUpdateDragger((prev) => !prev);
  }, [rowStart, columnStart, rows, columns]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper
        style={{
          gridArea: `${widgetSize.rowStart} / ${widgetSize.columnStart} / ${
            widgetSize.rowStart + widgetSize.rows
          } / ${widgetSize.columnStart + widgetSize.columns}`,
        }}
      >
        <Resizers
          defaultHeight={widgetSize.rows * gridUnit}
          defaultWidth={widgetSize.columns * gridUnit}
          gridUnit={gridUnit}
          handleOnSizeChange={handleOnSizeChange}
        />
        <Dragger
          gridUnit={gridUnit}
          handleOnDrag={handleOnDrag}
          updateDragger={updateDragger}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
        {!isDragging && children}
      </Wrapper>
    </ThemeProvider>
  );
}

export default WidgetContainer;
