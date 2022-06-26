import { innerHeight, outerHeight, innerWidth, outerWidth } from './domFns';
import { int } from './other';

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
