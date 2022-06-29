import theme from '../theme';

export const defaultLayout = Object.keys(theme.screens).reduce(
  (accu, screen) => ({ ...accu, [screen]: [] }),
  {},
);

type ScreenSize = keyof typeof theme.screens;

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
