export function getNextPhoto(currentPhoto: number, maxPhoto: number) {
  return currentPhoto + 1 <= maxPhoto ? currentPhoto + 1 : 0;
}
export function getPrevPhoto(currentPhoto: number, maxPhoto: number) {
  return currentPhoto - 1 >= 0 ? currentPhoto - 1 : maxPhoto;
}
