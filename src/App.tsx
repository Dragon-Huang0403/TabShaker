import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import globalTheme, { GlobalStyle } from './theme';
import WidgetContainer from './components/WidgetContainer';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, ${({ theme }) => theme.gridUnit}px);
  grid-template-rows: repeat(auto-fill, ${({ theme }) => theme.gridUnit}px);
  padding: 0px 50px;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <Wrapper>
        <WidgetContainer
          rowStart={3}
          columnStart={3}
          rows={2}
          columns={2}
          maxRows={5}
          minRows={2}
          maxColumns={5}
          minColumns={2}
        >
          <div>Hi~</div>
        </WidgetContainer>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
