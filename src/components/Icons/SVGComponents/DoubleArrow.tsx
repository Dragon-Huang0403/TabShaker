import React from 'react';

interface DoubleArrowProps {
  direction: 'left' | 'right';
}

const rotate = {
  left: 'rotate(180deg)',
  right: 'rotate(0deg)',
};

function DoubleArrow({ direction }: DoubleArrowProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      viewBox="0 0 48 48"
      style={{ transform: rotate[direction] }}
    >
      <path d="m12.1 38 10.5-14-10.5-14h3.7l10.5 14-10.5 14Zm12.6 0 10.5-14-10.5-14h3.7l10.5 14-10.5 14Z" />
    </svg>
  );
}

export default DoubleArrow;
