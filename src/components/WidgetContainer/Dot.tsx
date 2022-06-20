/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled, { css } from 'styled-components';
import defaultTheme from './defaultTheme';

interface WrapperProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

type TPosition = keyof WrapperProps;

interface IDot {
  position: TPosition;
}

const { dotSize, borderSize } = defaultTheme;

const dotStyles: { [position: string]: WrapperProps } = {
  top: {
    top: `-${(dotSize + borderSize) / 2}px`,
    left: `calc(50% - ${dotSize / 2}px)`,
  },
  bottom: {
    bottom: `-${(dotSize + borderSize) / 2}px`,
    left: `calc(50% - ${dotSize / 2}px)`,
  },
  left: {
    left: `-${(dotSize + borderSize) / 2}px`,
    top: `calc(50% - ${dotSize / 2}px)`,
  },
  right: {
    right: `-${(dotSize + borderSize) / 2}px`,
    top: `calc(50% - ${dotSize / 2}px)`,
  },
} as const;

const Wrapper = styled.div<WrapperProps>`
  display: inline-block;
  position: absolute;
  background: ${({ theme }) => theme.color};
  width: ${({ theme }) => theme.dotSize}px;
  height: ${({ theme }) => theme.dotSize}px;
  border-radius: 50%;
  ${({ top }) =>
    top &&
    css`
      top: ${top};
    `}
  ${({ bottom }) =>
    bottom &&
    css`
      bottom: ${bottom};
    `}
  ${({ left }) =>
    left &&
    css`
      left: ${left};
    `}
  ${({ right }) =>
    right &&
    css`
      right: ${right};
    `}
`;

function Dot({ position }: IDot) {
  const { top, bottom, left, right } = dotStyles[position];
  return <Wrapper top={top} bottom={bottom} left={left} right={right} />;
}

export default Dot;
