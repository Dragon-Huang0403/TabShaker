import { innerHeight, outerHeight, innerWidth, outerWidth } from './domFns';
import { int } from './other';
import type {
  Constraint,
  // GridItemData,
  // Layout,
  LayoutItem,
  Position,
} from '../../types/GridLayoutTypes';

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

// export function moveItems(
//   items: GridItemData[],
//   id: string,
//   newLayout: Layout,
//   // cols: number,
// ) {
//   return newLayout;
// }

// function calcTwoWidgetOverlapArea(item1: GridItemData, item2: GridItemData) {
//     const rec1 = [
//       item1.x,
//       widget1.columnStart,
//       widget1.rowStart + widget1.rows,
//       widget1.columnStart + widget1.columns,
//     ];
//     const rec2 = [
//       widget2.rowStart,
//       widget2.columnStart,
//       widget2.rowStart + widget2.rows,
//       widget2.columnStart + widget2.columns,
//     ];
//   const overLayRows = Math.max(
//     0,
//     Math.min(rec1[2], rec2[2]) - Math.max(rec1[0], rec2[0]),
//   );
//   const overLayColumns = Math.max(
//     0,
//     Math.min(rec1[3], rec2[3]) - Math.max(rec1[1], rec2[1]),
//   );

//   if (overLayRows > 0 && overLayColumns > 0) {
//     return { overLayRows, overLayColumns };
//   }
//   return null;
// }

// function collides(item: GridItemData, targetItem: GridItemData){
//   if (item.id === targetItem.id) return false
//  }

// export function getAllCollisions(items: GridItemData[], targetItem: GridItemData) {
//   return items.filter(item=> collides(item,targetItem))
// }
