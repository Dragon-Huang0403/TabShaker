import React, { useReducer } from 'react';
import styled from 'styled-components';
import Resizers from './Resizers';
import globalTheme from '../../theme';
import type { THandleOnSizeChange } from './Resizers';
import type { TDirection } from './Resizer';

const Wrapper = styled.div`
  position: relative;
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

export interface IAction {
  widthDiff: number;
  heightDiff: number;
  resizeDirection: TDirection;
}

function reducer(state: IWidgetSize, action: IAction) {
  const newRowStart =
    state.rowStart - action.heightDiff >= 1
      ? state.rowStart - action.heightDiff
      : 1;
  const newRows =
    state.rows + action.heightDiff >= 1 ? state.rows + action.heightDiff : 1;
  const newColumnStart =
    state.columnStart - action.widthDiff >= 1
      ? state.columnStart - action.widthDiff
      : 1;
  const newColumns =
    state.columns + action.widthDiff >= 1
      ? state.columns + action.widthDiff
      : 1;
  switch (action.resizeDirection) {
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

function WidgetContainer({
  rowStart,
  rows,
  columnStart,
  columns,
}: IWidgetSize) {
  const { gridUnit } = globalTheme;
  const defaultSize = { rowStart, rows, columnStart, columns };
  const [widgetSize, dispatch] = useReducer(reducer, defaultSize);

  const handleOnSizeChange: THandleOnSizeChange = (
    widthDiff,
    heightDiff,
    resizeDirection,
  ) => {
    dispatch({ widthDiff, heightDiff, resizeDirection });
  };
  return (
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
    </Wrapper>
  );
}

export default WidgetContainer;
