import React, { useReducer } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Resizers from './Resizers';
import Dragger from './Dragger';
import globalTheme from '../../theme';
import type { THandleOnSizeChange } from './Resizers';
import type { TDirection } from './Resizer';
import defaultTheme from './defaultTheme';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface IWidgetSize {
  rowStart: number;
  columnStart: number;
  rows: number;
  columns: number;
}

export type TOnSizeChange = (payload: {
  type: keyof IWidgetSize;
  value: number;
}) => void;

interface ILimit {
  maxRows: number;
  minRows: number;
  maxColumns: number;
  minColumns: number;
}

export interface IAction {
  payload: {
    type: 'resize' | 'move';
    widthDiff: number;
    heightDiff: number;
    resizeDirection?: TDirection;
  };
  limit: ILimit;
}

function reducer(state: IWidgetSize, action: IAction) {
  const { heightDiff, widthDiff, resizeDirection, type } = action.payload;
  const { rowStart, rows, columnStart, columns } = state;
  const { maxColumns, minColumns, maxRows, minRows } = action.limit;

  if (type === 'resize') {
    const getNewRows = () => {
      if (rows + heightDiff >= minRows) {
        return Math.min(rows + heightDiff, maxRows);
      }
      return minRows;
    };
    const getNewColumns = () => {
      if (columns + widthDiff >= minColumns) {
        return Math.min(columns + widthDiff, maxColumns);
      }
      return minColumns;
    };

    const newRows = getNewRows();
    const newColumns = getNewColumns();
    const newRowStart =
      rowStart + rows - newRows >= 1 ? rowStart + rows - newRows : 1;
    const newColumnStart =
      columnStart + columns - newColumns >= 1
        ? columnStart + columns - newColumns
        : 1;

    switch (resizeDirection) {
      case 'top':
        return {
          ...state,
          rowStart: newRowStart,
          rows: newRows,
        };
      case 'bottom':
        return {
          ...state,
          rows: newRows,
        };
      case 'left':
        return {
          ...state,
          columnStart: newColumnStart,
          columns: newColumns,
        };
      case 'right':
        return {
          ...state,
          columns: newColumns,
        };
      case 'topLeft':
        return {
          rowStart: newRowStart,
          rows: newRows,
          columnStart: newColumnStart,
          columns: newColumns,
        };
      case 'topRight':
        return {
          ...state,
          rowStart: newRowStart,
          rows: newRows,
          columns: newColumns,
        };
      case 'bottomLeft':
        return {
          ...state,
          rows: newRows,
          columnStart: newColumnStart,
          columns: newColumns,
        };
      case 'bottomRight':
        return {
          ...state,
          rows: newRows,
          columns: newColumns,
        };
      default:
        return state;
    }
  }

  if (type === 'move') {
    const newRowStart = rowStart + heightDiff >= 1 ? rowStart + heightDiff : 1;
    const newColumnStart =
      columnStart + widthDiff >= 1 ? columnStart + widthDiff : 1;
    return { ...state, rowStart: newRowStart, columnStart: newColumnStart };
  }
  return state;
}

interface WidgetContainerProps extends IWidgetSize, ILimit {
  children: JSX.Element;
}

function WidgetContainer({
  rowStart,
  rows,
  columnStart,
  columns,
  maxRows,
  minRows,
  maxColumns,
  minColumns,
  children,
}: WidgetContainerProps) {
  const { gridUnit } = globalTheme;
  const defaultSize = { rowStart, rows, columnStart, columns };
  const [widgetSize, dispatch] = useReducer(reducer, defaultSize);

  const handleOnSizeChange: THandleOnSizeChange = (
    widthDiff,
    heightDiff,
    resizeDirection,
  ) => {
    dispatch({
      payload: { widthDiff, heightDiff, resizeDirection, type: 'resize' },
      limit: { maxRows, minRows, maxColumns, minColumns },
    });
  };

  const handleOnMove = (widthDiff: number, heightDiff: number) => {
    dispatch({
      payload: { widthDiff, heightDiff, type: 'move' },
      limit: { maxRows, minRows, maxColumns, minColumns },
    });
  };

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
