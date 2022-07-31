import React from 'react';
import { defaultProps, SVGIconProps } from './type/svgIconType';

function Pause({ style, fill, onClick }: SVGIconProps) {
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
      <path d="M28.25 38V10H36V38ZM12 38V10H19.75V38Z" />
    </svg>
  );
}

Pause.defaultProps = defaultProps;

export default Pause;
