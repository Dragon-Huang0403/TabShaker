/* eslint-disable import/prefer-default-export */
export function calculateOverlapArea(rec1: number[], rec2: number[]) {
  const row = Math.max(
    0,
    Math.min(rec1[2], rec2[2]) - Math.max(rec1[0], rec2[0]),
  );
  const column = Math.max(
    0,
    Math.min(rec1[3], rec2[3]) - Math.max(rec1[1], rec2[1]),
  );

  if (row > 0 && column > 0) {
    return { row, column };
  }
  return null;
}
