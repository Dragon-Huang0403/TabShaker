import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from './theme';
import WidgetContainer from './components/WidgetContainer';

const Wrapper = styled.div`
  padding: 100px 150px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <WidgetContainer />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
