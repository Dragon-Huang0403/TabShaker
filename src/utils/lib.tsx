/* eslint-disable import/prefer-default-export */
export function calculateOverlapArea(rec1: number[], rec2: number[]) {
  const overLayRows = Math.max(
    0,
    Math.min(rec1[2], rec2[2]) - Math.max(rec1[0], rec2[0]),
  );
  const overLayColumns = Math.max(
    0,
    Math.min(rec1[3], rec2[3]) - Math.max(rec1[1], rec2[1]),
  );

  if (overLayRows > 0 && overLayColumns > 0) {
    return { overLayRows, overLayColumns };
  }
  return null;
}

export function createArray(length: number) {
  return Array(length).fill('');
}
