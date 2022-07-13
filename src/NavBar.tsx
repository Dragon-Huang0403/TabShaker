import React, { useState } from 'react';
import styled from 'styled-components';
import GoogleMenu from './components/GoogleMenu';
import { AppIcon, AddIcon } from './components/Icons';
import SelectNewWidget from './SelectNewWidget';
import type { WidgetData } from './types/WidgetTypes';

const Wrapper = styled.div`
  width: 100%;
  height: 56px;
  padding: 8px 8px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const LeftPart = styled.div`
  display: flex;
  padding: 5px 10px;
  align-self: flex-start;
  border-radius: 20px;
  transition: all 0.5s;
  z-index: 1;
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
  cursor: pointer;
  background: radial-gradient(circle, #3333 25%, #3332 50%, #33333305 70%);
  border-radius: 50%;

  & > svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.color.white};
  }

  :hover {
    background: ${({ theme }) => theme.color.transparentBlack};
    box-shadow: 0px 0px 10px -3px ${({ theme }) => theme.color.lightWhite};
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
  text-shadow: 0.1em 0.1em 0.2em black;

  &,
  &:visited {
    color: ${({ theme }) => theme.color.white};
  }
  &:hover {
    font-weight: 500;
    text-decoration: underline;
  }
`;

interface NavBarProps {
  addWidget: (newWidget: WidgetData) => void;
}

function NavBar({ addWidget }: NavBarProps) {
  const [idGoogleMenuOpen, setIsGoogleMenuOpen] = useState(false);
  const [isShowSelectNewWidget, setIsSelectNewWidget] = useState(false);

  const toggleGoogleMenuOpen = () => {
    setIsGoogleMenuOpen((prev) => !prev);
  };

  return (
    <Wrapper>
      <LeftPart>
        <IconContainer
          onClick={() => {
            setIsSelectNewWidget(true);
          }}
        >
          <AddIcon />
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
      {isShowSelectNewWidget && (
        <SelectNewWidget
          hideSelectNewWidget={() => {
            setIsSelectNewWidget(false);
          }}
          addWidget={addWidget}
        />
      )}
    </Wrapper>
  );
}

export default NavBar;
