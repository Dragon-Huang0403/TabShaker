import { innerHeight, outerHeight, innerWidth, outerWidth } from './domFns';
import { int } from './other';
import type {
  Constraint,
  Layout,
  LayoutItem,
  Position,
  Layouts,
} from '../../types/GridLayoutTypes';
import type { ScreenSize } from '../config';

export function getBoundPosition(
  node: HTMLElement,
  boundNode: HTMLElement,
  x: number,
  y: number,
) {
  const nodeStyle = window.getComputedStyle(node);
  const boundNodeStyle = window.getComputedStyle(boundNode);
  const bounds = {
    left:
      -node.offsetLeft +
      int(boundNodeStyle.paddingLeft) +
      int(nodeStyle.marginLeft),
    top:
      -node.offsetTop +
      int(boundNodeStyle.paddingTop) +
      int(nodeStyle.marginTop),
    right:
      innerWidth(boundNode) -
      outerWidth(node) -
      node.offsetLeft +
      int(boundNodeStyle.paddingRight) -
      int(nodeStyle.marginRight),
    bottom:
      innerHeight(boundNode) -
      outerHeight(node) -
      node.offsetTop +
      int(boundNodeStyle.paddingBottom) -
      int(nodeStyle.marginBottom),
  };

  let newX = Math.min(x, bounds.right);
  let newY = Math.min(y, bounds.bottom);

  newX = Math.max(newX, bounds.left);
  newY = Math.max(newY, bounds.top);

  return [newX, newY];
}

export function snapToGrid(
  gridUnit: number,
  pendingX: number,
  pendingY: number,
) {
  const deltaX = Math.round(pendingX / gridUnit) * gridUnit;
  const deltaY = Math.round(pendingY / gridUnit) * gridUnit;
  return [deltaX, deltaY];
}

export function runConstraint(
  constraint: Constraint,
  width: number,
  height: number,
) {
  const { minWidth, maxWidth, minHeight, maxHeight } = constraint;
  let newWidth = Math.min(width, maxWidth);
  newWidth = Math.max(newWidth, minWidth);
  let newHeight = Math.min(height, maxHeight);
  newHeight = Math.max(newHeight, minHeight);
  return [newWidth, newHeight];
}

export function getPosition(layout: LayoutItem, gridUnit: number[]): Position {
  const { x, y, w, h } = layout;
  const left = x * gridUnit[0];
  const width = w * gridUnit[0];
  const top = y * gridUnit[1];
  const height = h * gridUnit[1];
  return { left, top, width, height };
}

function calcTwoWidgetOverlapArea(item1: LayoutItem, item2: LayoutItem) {
  const rec1 = [item1.x, item1.y, item1.x + item1.w, item1.y + item1.h];
  const rec2 = [item2.x, item2.y, item2.x + item2.w, item2.y + item2.h];
  const w = Math.max(
    0,
    Math.min(rec1[2], rec2[2]) - Math.max(rec1[0], rec2[0]),
  );
  const h = Math.max(
    0,
    Math.min(rec1[3], rec2[3]) - Math.max(rec1[1], rec2[1]),
  );

  if (w > 0 && h > 0) {
    return { w, h };
  }
  return null;
}

function collides(item: LayoutItem, targetItem: LayoutItem) {
  if (item.id === targetItem.id) return false;
  return calcTwoWidgetOverlapArea(item, targetItem) !== null;
}

function getAllCollisions(layout: Layout, targetItem: LayoutItem) {
  return layout.filter((item) => collides(item, targetItem));
}

export function canElementMove(layout: Layout, targetItem: LayoutItem) {
  return getAllCollisions(layout, targetItem).length === 0;
}

export function moveElement(
  oldLayout: Layout,
  targetItem: LayoutItem,
  layout: Layout,
  cols: number,
) {
  return layout.map((item) => {
    if (item.id === targetItem.id) {
      return targetItem;
    }
    const overLapArea = calcTwoWidgetOverlapArea(targetItem, item);
    if (!overLapArea) {
      const oldItem = oldLayout.find((l) => l.id === item.id)!;
      const newItem = item;
      if (oldItem.x !== newItem.x) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (newItem.x === oldItem.x) break;
          let { x } = newItem;
          x += oldItem.x > newItem.x ? 1 : -1;
          if (x < 0 || x + newItem.w >= cols) break;
          if (!canElementMove(layout, { ...newItem, x })) break;
          newItem.x = x;
        }
      }
      if (oldItem.y !== newItem.y) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (newItem.y === oldItem.y) break;
          let { y } = newItem;
          y += oldItem.y > newItem.y ? 1 : -1;
          if (y < 0) break;
          if (!canElementMove(layout, { ...newItem, y })) break;
          newItem.y = y;
        }
      }

      return newItem;
    }
    const newItem = { ...item };
    if (overLapArea.w > overLapArea.h) {
      newItem.y =
        item.y >= targetItem.y
          ? (newItem.y += overLapArea.h)
          : (newItem.y -= overLapArea.h);
      newItem.y = Math.max(0, newItem.y);
    } else {
      newItem.x =
        item.x >= targetItem.x
          ? (newItem.x += overLapArea.w)
          : (newItem.x -= overLapArea.w);
      newItem.x = Math.max(0, newItem.x);
      newItem.x = Math.min(newItem.x, cols - newItem.w);
    }
    if (canElementMove(layout, newItem)) {
      return newItem;
    }
    return item;
  });
}

export function getAvailableLayoutItem(
  layout: Layout,
  cols: number,
  newLayoutItem: LayoutItem,
): LayoutItem {
  let { w, x, y } = newLayoutItem;
  w = Math.min(cols, w);
  if (x + w >= cols) {
    x = 0;
    y += 1;
  }
  const availableLayoutItem = { ...newLayoutItem, w, x, y };
  if (!canElementMove(layout, availableLayoutItem)) {
    return getAvailableLayoutItem(layout, cols, {
      ...availableLayoutItem,
      x: x + 1,
    });
  }
  return availableLayoutItem;
}

export function getOtherScreenSizeLayoutItem(id: string, layouts: Layouts) {
  let layoutItem: LayoutItem | null = null;

  (Object.keys(layouts) as ScreenSize[]).forEach((screenSize) =>
    layouts[screenSize].forEach((item) => {
      if (item.id === id) {
        layoutItem = item;
      }
    }),
  );

  return layoutItem;
}
