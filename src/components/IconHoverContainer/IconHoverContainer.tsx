import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2px;
  width: 28px;
  height: 28px;
  border-radius: 50%;

  &:hover {
    background: ${({ theme }) => theme.transparentWhite};
    cursor: pointer;
  }

  &:active {
    background: rgba(255, 255, 255, 0.18);
  }

  & > svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.white};
  }
`;

interface IconHoverContainerProps {
  children: JSX.Element;
  onClick: (e: React.MouseEvent) => void;
}

function IconHoverContainer({ children, onClick }: IconHoverContainerProps) {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
}

export default IconHoverContainer;
