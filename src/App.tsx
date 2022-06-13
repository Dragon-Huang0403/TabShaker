import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from './theme';

const Wrapper = styled.div``;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>Hi~</Wrapper>
    </ThemeProvider>
  );
}

export default App;
