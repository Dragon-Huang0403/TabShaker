import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.color.lightWhite};
  box-shadow: 0px 0px 4px 0px ${({ theme }) => theme.color.transparentBlack};
  :hover {
    background: ${({ theme }) => theme.color.white};
  }
`;

interface RoundButtonProps {
  children: React.ReactElement | string;
}

function RoundButton({ children }: RoundButtonProps) {
  return <Wrapper>{children}</Wrapper>;
}

export default RoundButton;
