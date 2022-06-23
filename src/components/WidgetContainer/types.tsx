type BasicDirection = 'top' | 'bottom' | 'left' | 'right';

type WidgetType = 'note';

type Direction =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

interface NewWidget {
  rows: number;
  columns: number;
  type: WidgetType;
}

interface WidgetSize {
  rowStart: number;
  columnStart: number;
  rows: number;
  columns: number;
}

interface WidgetData extends WidgetSize {
  type: WidgetType;
  id: string;
  style?: {};
  data?: {};
}

interface WidgetSizeLimit {
  maxRows: number;
  minRows: number;
  maxColumns: number;
  minColumns: number;
}

export type {
  NewWidget,
  BasicDirection,
  Direction,
  WidgetSize,
  WidgetSizeLimit,
  WidgetData,
};
