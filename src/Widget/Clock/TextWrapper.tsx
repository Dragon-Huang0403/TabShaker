import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{ side: 'top' | 'bottom' }>`
  background: ${({ theme }) => theme.color.littleTransparentBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  ${({ side }) => css`
    ${side}: 0;
    height: 49%;
    width: 100%;
    border-${side}-left-radius: 10px;
    border-${side}-right-radius: 10px;
    overflow: hidden;

    & > svg,
    & > svg > text {
      position: absolute;
      ${side}: 0%;
      width: 85%;
      height: 200%;
      fill: white;
      font-size: 1rem;
    }
  `}
`;

interface TextWrapperProps {
  text: string;
  side: 'top' | 'bottom';
}

function TextWrapper({ text, side }: TextWrapperProps) {
  return (
    <Wrapper side={side}>
      <svg width="20" height="20" viewBox="0 0 20 20">
        <text
          x="10"
          y="60%"
          width="20"
          height="20"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {text}
        </text>
      </svg>
    </Wrapper>
  );
}

export default TextWrapper;
