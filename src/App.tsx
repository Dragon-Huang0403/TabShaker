import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import globalTheme, { GlobalStyle } from './theme';
import NavBar from './NavBar';
import Widgets from './Widgets';
import BackgroundImage from './BackgroundImage';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <BackgroundImage />
      <Wrapper>
        <NavBar />
        <Widgets />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
