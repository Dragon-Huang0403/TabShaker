export type NewLayoutItem = {
  id: string;
  w: number;
  h: number;
};

export type LayoutItem = {
  x: number;
  y: number;
} & NewLayoutItem;

export type Layout = LayoutItem[];

export type Layouts = {
  lg: Layout;
};

export type Position = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type Limit = {
  minW: number;
  maxW: number;
  minH: number;
  maxH: number;
};

export type Constraint = {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
};

export type DraggerData = {
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
};

export type ResizerData = {
  deltaX: number;
  deltaY: number;
  x: number;
  y: number;
};

export type ResizerDirections =
  | 's'
  | 'w'
  | 'e'
  | 'n'
  | 'sw'
  | 'nw'
  | 'se'
  | 'ne';
