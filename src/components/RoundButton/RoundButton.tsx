import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.color.lightWhite};
  box-shadow: 0px 0px 4px 0px ${({ theme }) => theme.color.transparentBlack};
  opacity: 0.9;
  overflow: hidden;

  :hover {
    opacity: 1;
    background: ${({ theme }) => theme.color.white};
  }
  :active {
    opacity: 0.9;
  }
`;
const defaultProps = { onClick: () => {} };

type RoundButtonProps = {
  children: React.ReactElement | string;
  onClick?: () => void;
} & typeof defaultProps;

function RoundButton({ children, onClick }: RoundButtonProps) {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
}

RoundButton.defaultProps = defaultProps;

export default RoundButton;
