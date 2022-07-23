import { innerHeight, outerHeight, innerWidth, outerWidth } from './domFns';
import { int } from './other';

import type {
  Constraint,
  Layout,
  LayoutItem,
  Position,
  Layouts,
  DefaultLayout,
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
  let newY = y;

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

function switchElement(
  layout: Layout,
  movingItem: LayoutItem,
  targetItem: LayoutItem,
) {
  const layoutWithoutTargetItem = layout.filter(
    (item) => item.id !== targetItem.id,
  );
  const layoutWithoutMovingItem = layout.filter(
    (item) => item.id !== movingItem.id,
  );
  if (movingItem.x === targetItem.x) {
    const newMovingItem = { ...movingItem };
    newMovingItem.x += targetItem.w;
    if (
      canElementMove(layoutWithoutTargetItem, newMovingItem) &&
      canElementMove(layoutWithoutMovingItem, targetItem)
    ) {
      return newMovingItem;
    }
  }
  if (movingItem.x + movingItem.w === targetItem.x + targetItem.w) {
    const newMovingItem = { ...movingItem };
    newMovingItem.x = targetItem.x - movingItem.w;
    if (
      canElementMove(layoutWithoutTargetItem, newMovingItem) &&
      canElementMove(layoutWithoutMovingItem, targetItem)
    ) {
      return newMovingItem;
    }
  }
  if (movingItem.y === targetItem.y) {
    const newMovingItem = { ...movingItem };
    newMovingItem.y += targetItem.h;
    if (
      canElementMove(layoutWithoutTargetItem, newMovingItem) &&
      canElementMove(layoutWithoutMovingItem, targetItem)
    ) {
      return newMovingItem;
    }
  }
  return null;
}

function canItemSwitch(switchedItem: LayoutItem, cols: number) {
  const { x, w } = switchedItem;
  if (x < 0) return false;
  if (x + w > cols) return false;
  return true;
}

function getReversedAvailableValue(
  oldValue: number,
  value: number,
  validateFn: (value: number) => boolean,
  diff?: number,
  limit?: number,
): number {
  if (value === oldValue) return value;

  const newValue = oldValue > value ? value + 1 : value - 1;
  if (newValue < 0) return value;
  if (diff && limit && newValue + diff >= limit) return value;
  if (!validateFn(newValue)) return value;
  return getReversedAvailableValue(oldValue, newValue, validateFn, diff, limit);
}

function getReversedAvailablePosition(
  oldItem: LayoutItem,
  item: LayoutItem,
  layout: Layout,
  cols: number,
) {
  const newItem = { ...item };
  if (oldItem.x !== newItem.x) {
    const validateFn = (newX: number) =>
      canElementMove(layout, { ...newItem, x: newX });
    newItem.x = getReversedAvailableValue(
      oldItem.x,
      newItem.x,
      validateFn,
      newItem.w,
      cols,
    );
  }
  if (oldItem.y !== newItem.y) {
    const validateFn = (newY: number) =>
      canElementMove(layout, { ...newItem, y: newY });
    newItem.y = getReversedAvailableValue(oldItem.y, newItem.y, validateFn);
  }
  return newItem;
}

export function moveElement(
  oldLayout: Layout,
  targetItem: LayoutItem,
  layout: Layout,
  cols: number,
) {
  const newLayout = [...layout];
  newLayout.forEach((item, index) => {
    if (item.id === targetItem.id) {
      newLayout[index] = targetItem;
      return;
    }
    const overLapArea = calcTwoWidgetOverlapArea(targetItem, item);
    if (!overLapArea) {
      const oldItem = oldLayout.find((l) => l.id === item.id)!;
      if (canElementMove(layout, oldItem)) {
        newLayout[index] = oldItem;
        return;
      }
      newLayout[index] = getReversedAvailablePosition(
        oldItem,
        item,
        layout,
        cols,
      );
      return;
    }
    if (overLapArea.w > overLapArea.h) {
      const newItem = { ...item };
      newItem.y =
        item.y >= targetItem.y
          ? (newItem.y += overLapArea.h)
          : (newItem.y -= overLapArea.h);
      newItem.y = Math.max(0, newItem.y);
      if (canElementMove(layout, newItem)) {
        newLayout[index] = newItem;
        return;
      }
    }
    const newItem = { ...item };
    newItem.x =
      item.x >= targetItem.x
        ? (newItem.x += overLapArea.w)
        : (newItem.x -= overLapArea.w);
    newItem.x = Math.max(0, newItem.x);
    newItem.x = Math.min(newItem.x, cols - newItem.w);
    if (canElementMove(layout, newItem)) {
      newLayout[index] = newItem;
      return;
    }
    const switchedNewItem = switchElement(layout, item, targetItem);
    if (switchedNewItem && canItemSwitch(switchedNewItem, cols)) {
      newLayout[index] = switchedNewItem;
    }
  });
  return newLayout;
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

function getOtherScreenSizeLayoutItem(id: string, layouts: Layouts) {
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

export function getDefaultLayout(
  id: string,
  layouts: Layouts,
  defaultLayout: DefaultLayout,
) {
  const otherScreenLayout = getOtherScreenSizeLayoutItem(id, layouts);
  if (otherScreenLayout) return otherScreenLayout;
  return { ...defaultLayout, x: 0, y: 0 };
}
