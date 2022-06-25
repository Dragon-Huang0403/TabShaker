type BasicDirection = 'top' | 'bottom' | 'left' | 'right';

type WidgetType = 'note' | 'todo' | 'clock';

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
  style: any;
  data: any;
}

interface WidgetSize {
  rowStart: number;
  columnStart: number;
  rows: number;
  columns: number;
}

interface WidgetData extends WidgetSize, NewWidget {
  type: WidgetType;
  id: string;
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
  WidgetType,
};
