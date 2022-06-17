import type {
  WidgetSize,
  WidgetSizeLimit,
  Direction,
  BasicDirection,
} from './types';

export function hasDirection(direction: BasicDirection, target: Direction) {
  return new RegExp(direction, 'i').test(target);
}

function calculateNewLength(
  length: number,
  lengthDiff: number,
  min: number,
  max: number,
) {
  const newLength = length + lengthDiff;
  if (newLength >= min) {
    return Math.min(newLength, max);
  }
  return min;
}

export function getNewWidgetSize(
  oldWidgetSize: WidgetSize,
  limit: WidgetSizeLimit,
  changes: {
    columnsDiff: number;
    rowsDiff: number;
    direction: Direction;
  },
): WidgetSize {
  const { columnsDiff, rowsDiff, direction } = changes;
  const { rowStart, rows, columnStart, columns } = oldWidgetSize;
  const { maxColumns, minColumns, maxRows, minRows } = limit;
  const newRows = calculateNewLength(rows, rowsDiff, minRows, maxRows);
  const newColumns = calculateNewLength(
    columns,
    columnsDiff,
    minColumns,
    maxColumns,
  );
  const newWidgetSize = { ...oldWidgetSize };
  if (hasDirection('top', direction)) {
    const newRowStart = rowStart + rows - newRows;
    if (newRowStart >= 1) {
      newWidgetSize.rowStart = newRowStart;
      newWidgetSize.rows = newRows;
    }
  }
  if (hasDirection('bottom', direction)) {
    newWidgetSize.rows = newRows;
  }
  if (hasDirection('left', direction)) {
    const newColumnStart = columnStart + columns - newColumns;
    if (newColumnStart >= 1) {
      newWidgetSize.columnStart = newColumnStart;
      newWidgetSize.columns = newColumns;
    }
  }
  if (hasDirection('right', direction)) {
    newWidgetSize.columns = newColumns;
  }
  return newWidgetSize;
}
