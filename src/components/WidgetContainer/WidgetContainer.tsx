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
}: WidgetContainerProps) {
  const { gridUnit } = globalTheme;
  const defaultSize = { rowStart, rows, columnStart, columns };
  const [widgetSize, setWidgetSize] = useState(defaultSize);

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

  const handleOnMove = (widthDiff: number, heightDiff: number) => {
    const newRowStart = rowStart + heightDiff >= 1 ? rowStart + heightDiff : 1;
    const newColumnStart =
      columnStart + widthDiff >= 1 ? columnStart + widthDiff : 1;
    const newWidgetSize = {
      ...widgetSize,
      rowStart: newRowStart,
      columnStart: newColumnStart,
    };
    if (!canWidgetMove(newWidgetSize)) return;
    setWidgetSize(newWidgetSize);
  };

  useEffect(() => {
    onChange(widgetSize);
  }, [widgetSize]);

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
        <Dragger gridUnit={gridUnit} handleOnMove={handleOnMove} />
        {children}
      </Wrapper>
    </ThemeProvider>
  );
}

export default WidgetContainer;
