import React, { useState } from 'react';
import styled from 'styled-components';
import GoogleLogo from './GoogleLogo';

const Wrapper = styled.div`
  background-color: rgb(66, 133, 244);
  display: inline-flex;
  align-items: center;
  color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 1px 0 rgba(0, 0, 0, 0.24);
  padding: 0;
  border-radius: 2;
  border: 1px solid transparent;
  fontsize: 14;
  font-weight: 500;
  font-family: Roboto, sans-serif;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }

  :active {
    background: #3367d6;
    color: #fff;
    opacity: 1;
  }
`;
const IconWrapper = styled.div<{ active: boolean }>`
  margin-right: 10px;
  background: ${({ active }) => (active ? '#eee' : '#fff')};
  padding: 10px;
  border-radius: 2px;
`;

const ButtonContent = styled.span`
  padding: 10px 10px 10px 0px;
  font-weight: 500;
`;

interface GoogleLoginButtonProps {
  onClick: () => void;
}

function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  const [isActive, setIsActive] = useState(false);
  return (
    <Wrapper
      onMouseDown={() => {
        setIsActive(true);
      }}
      onMouseUp={() => {
        setIsActive(false);
      }}
      onClick={onClick}
    >
      <IconWrapper active={isActive}>
        <GoogleLogo />
      </IconWrapper>
      <ButtonContent>Sign in with Google</ButtonContent>
    </Wrapper>
  );
}

export default GoogleLoginButton;
