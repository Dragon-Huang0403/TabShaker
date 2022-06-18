import React from 'react';
import styled from 'styled-components';
import GoogleMenu from './components/GoogleMenu';

const Wrapper = styled.div`
  margin: 20px;
`;

function Header() {
  return (
    <Wrapper>
      <GoogleMenu />
    </Wrapper>
  );
}

export default Header;
