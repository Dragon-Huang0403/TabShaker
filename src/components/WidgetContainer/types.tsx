type BasicDirection = 'top' | 'bottom' | 'left' | 'right';

type Direction =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

interface WidgetSize {
  rowStart: number;
  columnStart: number;
  rows: number;
  columns: number;
}

interface WidgetSizeLimit {
  maxRows: number;
  minRows: number;
  maxColumns: number;
  minColumns: number;
}

export type { BasicDirection, Direction, WidgetSize, WidgetSizeLimit };
