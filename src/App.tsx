import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import globalTheme, { GlobalStyle } from './theme';
import Widgets from './Widgets';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <Wrapper>
        <Widgets />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
