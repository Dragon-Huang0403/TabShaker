import theme from '../theme';

export const defaultLayout = {
  sm: [],
  md: [],
  lg: [],
  xl: [],
};

export const colsConfig = {
  sm: 20,
  md: 25,
  lg: 30,
  xl: 40,
};

export function getScreenSize(screenWidth: number) {
  const { screens } = theme;
  if (screenWidth >= screens.xl) return 'xl';
  if (screenWidth >= screens.lg) return 'lg';
  if (screenWidth >= screens.md) return 'md';
  return 'sm';
}
