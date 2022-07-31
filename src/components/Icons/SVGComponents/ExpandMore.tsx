import React from 'react';
import { defaultProps, SVGIconProps } from './type/svgIconType';

function ExpandMore({ style, fill, onClick }: SVGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      viewBox="0 0 48 48"
      style={style}
      fill={fill}
      onClick={onClick}
    >
      <path d="M24 30.75 12 18.75 14.15 16.6 24 26.5 33.85 16.65 36 18.8Z" />
    </svg>
  );
}

ExpandMore.defaultProps = defaultProps;

export default ExpandMore;
