import theme from '../theme';
import { Layouts } from '../types/GridLayoutTypes';

export type ScreenSize = keyof typeof theme.screens;

export const defaultLayout = (
  Object.keys(theme.screens) as ScreenSize[]
).reduce((accu, screen) => ({ ...accu, [screen]: [] }), {}) as Layouts;

export function getScreenInfo(
  currentScreenWidth: number,
): [ScreenSize, number] {
  const { screens } = theme;
  let screenSize: ScreenSize = 'sm';
  (Object.keys(screens) as ScreenSize[]).forEach((s) => {
    const { screenWidth } = screens[s];
    if (currentScreenWidth >= screenWidth) {
      screenSize = s;
    }
  });
  const { cols } = screens[screenSize];
  return [screenSize, cols];
}
