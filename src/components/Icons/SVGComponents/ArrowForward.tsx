import React from 'react';
import { defaultProps, SVGIconProps } from './type/svgIconType';

function ArrowForward({ style, fill, onClick }: SVGIconProps) {
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
      <path d="M24 40 21.9 37.85 34.25 25.5H8V22.5H34.25L21.9 10.15L24 8L40 24Z" />
    </svg>
  );
}

ArrowForward.defaultProps = defaultProps;

export default ArrowForward;
