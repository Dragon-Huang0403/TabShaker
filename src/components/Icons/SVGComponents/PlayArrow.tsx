import React from 'react';
import { defaultProps, SVGIconProps } from './type/svgIconType';

function PlayArrow({ style, fill, onClick }: SVGIconProps) {
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
      <path d="M16 37.85V9.85L38 23.85ZM19 23.85ZM19 32.4 32.45 23.85 19 15.3Z" />
    </svg>
  );
}
PlayArrow.defaultProps = defaultProps;

export default PlayArrow;
