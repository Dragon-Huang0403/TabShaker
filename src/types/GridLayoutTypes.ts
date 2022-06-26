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
