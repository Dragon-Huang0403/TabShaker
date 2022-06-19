import React, { useState } from 'react';
import styled from 'styled-components';
import GoogleMenu from './components/GoogleMenu';
import { AppIcon, SettingsIcon, DeleteIcon, AddIcon } from './components/Icons';

const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftPart = styled.div`
  display: flex;
  padding: 5px 10px;
  align-self: flex-start;
  border-radius: 20px;
  transition: all 0.5s;
  z-index: 1;

  & > div:not(:first-child) {
    opacity: 0;
  }

  &:hover {
    background: #0009;

    & > div:not(:first-child) {
      opacity: 1;
    }

    & svg {
      fill: #3498db;
    }
  }
`;

const MiddlePart = styled.div``;
const RightPart = styled.div`
  padding-right: 10px;
  position: relative;
  display: flex;
  align-items: center;
`;

const GoogleMenuWrapper = styled.div`
  position: absolute;
  width: 342px;
  margin-top: 48px;
  right: 0;
  top: 0;
`;

const IconContainer = styled.div`
  padding: 3px;
  height: 30px;
  width: 30px;
  & > svg {
    width: 24px;
    height: 24px;
    fill: white;
  }

  :hover {
    cursor: pointer;
    background: #fff3;
    border-radius: 50%;
  }
`;

const AppIconContainer = styled(IconContainer)`
  height: 36px;
  width: 36px;
  padding: 6px;
`;

const Link = styled.a`
  user-select: none;
  margin-right: 20px;
  &,
  &:visited {
    color: white;
  }
  &:hover {
    font-weight: 500;
    text-decoration: underline;
  }
`;

function Header() {
  const [idGoogleMenuOpen, setIsGoogleMenuOpen] = useState(false);

  const toggleGoogleMenuOpen = () => {
    setIsGoogleMenuOpen((prev) => !prev);
  };

  return (
    <Wrapper>
      <LeftPart>
        <IconContainer>
          <SettingsIcon />
        </IconContainer>
        <IconContainer>
          <AddIcon />
        </IconContainer>
        <IconContainer>
          <DeleteIcon />
        </IconContainer>
      </LeftPart>
      <MiddlePart />
      <RightPart>
        <Link href="https://mail.google.com/mail/">Gmail</Link>
        <Link href="https://www.google.com.tw/imghp">Images</Link>
        <AppIconContainer onClick={toggleGoogleMenuOpen}>
          <AppIcon />
        </AppIconContainer>
        <GoogleMenuWrapper>
          {idGoogleMenuOpen && <GoogleMenu />}
        </GoogleMenuWrapper>
      </RightPart>
    </Wrapper>
  );
}

export default Header;
