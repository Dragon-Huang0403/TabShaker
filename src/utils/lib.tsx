import type {
  WidgetSize,
  Widget,
  NewWidget,
} from '../components/WidgetContainer/types';

const maxNumberOfColumns = 36;
const maxNumberOfRows = 19;

function calcTwoWidgetOverlapArea(widget1: WidgetSize, widget2: WidgetSize) {
  const rec1 = [
    widget1.rowStart,
    widget1.columnStart,
    widget1.rowStart + widget1.rows,
    widget1.columnStart + widget1.columns,
  ];
  const rec2 = [
    widget2.rowStart,
    widget2.columnStart,
    widget2.rowStart + widget2.rows,
    widget2.columnStart + widget2.columns,
  ];
  const overLayRows = Math.max(
    0,
    Math.min(rec1[2], rec2[2]) - Math.max(rec1[0], rec2[0]),
  );
  const overLayColumns = Math.max(
    0,
    Math.min(rec1[3], rec2[3]) - Math.max(rec1[1], rec2[1]),
  );

  if (overLayRows > 0 && overLayColumns > 0) {
    return { overLayRows, overLayColumns };
  }
  return null;
}

interface ConflictItem extends WidgetSize {
  overLayRows: number;
  overLayColumns: number;
  index: number;
}

export function getConflictItems(
  targetIndex: number,
  newWidgetSize: WidgetSize,
  widgets: WidgetSize[],
) {
  const conflictItems = widgets.reduce((accu, widget, index) => {
    if (targetIndex === index) return accu;
    const overlayArea = calcTwoWidgetOverlapArea(newWidgetSize, widget);
    if (overlayArea) {
      return [...accu, { ...widget, ...overlayArea, index }];
    }
    return accu;
  }, [] as ConflictItem[]);
  return conflictItems;
}

export function getAvailablePosition(
  widgets: Widget[],
  newWidget: NewWidget,
  newWidgetStartRow = 1,
  newWidgetStartColumn = 1,
): WidgetSize | null {
  const newWidgetSizeRowEnd = newWidgetStartRow + newWidget.rows;
  const newWidgetSizeColumnEnd = newWidgetStartColumn + newWidget.columns;
  const newWidgetSizeSize = {
    rowStart: newWidgetStartRow,
    columnStart: newWidgetStartColumn,
    rows: newWidget.rows,
    columns: newWidget.columns,
  };
  const conflictItemIndex = widgets.findIndex((widget) => {
    const result = calcTwoWidgetOverlapArea(newWidgetSizeSize, widget);
    return result;
  });
  if (conflictItemIndex === -1) {
    return {
      rows: newWidget.rows,
      columns: newWidget.columns,
      rowStart: newWidgetStartRow,
      columnStart: newWidgetStartColumn,
    };
  }
  let nextNewWidgetStartColumn = newWidgetStartColumn + 1;
  let nextNewWidgetStartRow = newWidgetStartRow;
  if (newWidgetSizeColumnEnd >= maxNumberOfColumns) {
    nextNewWidgetStartColumn = 1;
    nextNewWidgetStartRow += 1;
    if (newWidgetSizeRowEnd >= maxNumberOfRows) {
      return null;
    }
  }
  return getAvailablePosition(
    widgets,
    newWidget,
    nextNewWidgetStartRow,
    nextNewWidgetStartColumn,
  );
}

export function createArray(length: number) {
  return Array(length).fill('');
}
