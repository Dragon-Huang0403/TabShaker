export type GridItemPosition = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type GridItemData = {
  id: string;
  position: GridItemPosition;
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
