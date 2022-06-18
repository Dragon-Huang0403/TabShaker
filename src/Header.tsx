import React, { useState } from 'react';
import styled from 'styled-components';
import GoogleMenu from './components/GoogleMenu';
import appIcon from './images/icons/app.svg';

const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftPart = styled.div``;
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

const AppIcon = styled.img`
  margin-left: 15px;
  width: 30px;
  height: 30px;
  :hover {
    cursor: pointer;
    background: #3332;
    border-radius: 5px;
  }
`;

const Link = styled.a`
  margin-left: 15px;
  &,
  &:visited {
    color: ${({ theme }) => theme.black};
  }
  &:hover {
    font-weight: 500;
    text-decoration: underline;
  }
`;

function Header() {
  const [idGoogleMenuOpen, setIsGoogleMenuOpen] = useState(false);

  return (
    <Wrapper>
      <LeftPart />
      <MiddlePart />
      <RightPart>
        <Link href="https://mail.google.com/mail/">Gmail</Link>
        <Link href="https://www.google.com.tw/imghp">Images</Link>
        <AppIcon
          src={appIcon}
          alt=""
          onClick={() => {
            setIsGoogleMenuOpen((prev) => !prev);
          }}
        />
        <GoogleMenuWrapper>
          {idGoogleMenuOpen && <GoogleMenu />}
        </GoogleMenuWrapper>
      </RightPart>
    </Wrapper>
  );
}

export default Header;
