export const defaultProps = {
  style: {},
  fill: 'currentColor',
  onClick: () => {},
};

export type SVGIconProps = {
  style?: React.CSSProperties;
  fill?: string;
  onClick?: () => void;
} & typeof defaultProps;
