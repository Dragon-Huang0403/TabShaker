export function createCSSTransform(x: number, y: number) {
  return { transform: `translate(${x}px, ${y}px)` };
}

export function int(str: string) {
  return parseInt(str, 10);
}
