import React from 'react';
import { defaultProps, SVGIconProps } from './type/svgIconType';

function ArrowBack({ style, fill, onClick }: SVGIconProps) {
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
      <path d="M24 40 8 24 24 8 26.1 10.1 13.7 22.5H40V25.5H13.7L26.1 37.9Z" />
    </svg>
  );
}

ArrowBack.defaultProps = defaultProps;

export default ArrowBack;
