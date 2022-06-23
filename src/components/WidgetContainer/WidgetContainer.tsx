import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Resizers from './Resizers';
import Dragger from './Dragger';
import globalTheme from '../../theme';
import type { Direction, WidgetSizeLimit, WidgetSize } from './types';
import defaultTheme from './defaultTheme';
import { getNewWidgetSize } from './util';
import Menu from './Menu';

const Wrapper = styled.div`
  user-select: none;
  position: relative;
`;

const limit: WidgetSizeLimit = {
  maxRows: 5,
  minRows: 2,
  maxColumns: 5,
  minColumns: 2,
};

interface WidgetContainerProps extends WidgetSize {
  children: JSX.Element;
  onChange: (newWidgetSize: WidgetSize) => void;
  canWidgetMove: (newWidgetSize: WidgetSize) => boolean;
  handleConflict: (newWidgetSize: WidgetSize) => void;
  deleteWidget: () => void;
}

function WidgetContainer({
  rowStart,
  rows,
  columnStart,
  columns,
  children,
  onChange,
  canWidgetMove,
  handleConflict,
  deleteWidget,
}: WidgetContainerProps) {
  const { gridUnit } = globalTheme;
  const defaultSize = { rowStart, rows, columnStart, columns };
  const [widgetSize, setWidgetSize] = useState(defaultSize);
  const [updateDragger, setUpdateDragger] = useState(false);
  const [isHover, setIsHover] = useState(false);

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

  const style = {
    gridColumnStart: widgetSize.columnStart,
    gridColumnEnd: `span ${widgetSize.columns}`,
    gridRowStart: widgetSize.rowStart,
    gridRowEnd: `span ${widgetSize.rows}`,
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper
        style={style}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onBlur={() => {
          setIsHover(false);
        }}
      >
        {isHover && <Menu deleteWidget={deleteWidget} />}
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
        >
          {children}
        </Dragger>
      </Wrapper>
    </ThemeProvider>
  );
}

export default WidgetContainer;
