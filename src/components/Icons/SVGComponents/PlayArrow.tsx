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
      <path xmlns="http://www.w3.org/2000/svg" d="M16 37.85v-28l22 14Z" />
    </svg>
  );
}
PlayArrow.defaultProps = defaultProps;

export default PlayArrow;
