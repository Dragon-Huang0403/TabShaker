import type { Limit, Position } from '../../types/GridLayoutTypes';
import { Layout } from '../../types/GridLayoutTypes';

export function createCSSTransform(position: Position) {
  const { top, left, width, height } = position;
  const style = { transform: `translate(${left}px, ${top}px)`, width, height };
  return style;
}

export function int(str: string) {
  return parseInt(str, 10);
}

export function calcXY(position: Position, gridUnit: number[]) {
  const { left, top } = position;
  const x = Math.round(left / gridUnit[0]);
  const y = Math.round(top / gridUnit[1]);
  return [x, y];
}

export function calcGridItemLayout(position: Position, gridUnit: number[]) {
  const [x, y] = calcXY(position, gridUnit);
  const { width, height } = position;
  const w = Math.round(width / gridUnit[0]);
  const h = Math.round(height / gridUnit[1]);
  return { x, y, w, h };
}

export function getConstraint(limit: Limit, gridUnit: number[]) {
  const { minW, maxW, minH, maxH } = limit;
  const minWidth = minW * gridUnit[0];
  const maxWidth = maxW * gridUnit[0];
  const minHeight = minH * gridUnit[1];
  const maxHeight = maxH * gridUnit[1];
  return { minWidth, maxWidth, minHeight, maxHeight };
}

export function findLayoutItem(layout: Layout, id: string) {
  return layout.find((item) => item.id === id);
}
