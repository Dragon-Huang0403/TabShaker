import React from 'react';
import { defaultProps, SVGIconProps } from './type/svgIconType';

function Check({ style, fill, onClick }: SVGIconProps) {
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
      <path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z" />
    </svg>
  );
}

Check.defaultProps = defaultProps;

export default Check;
