import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import type { WidgetSize, NewWidget } from './components/WidgetContainer/types';
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

const defaultWidgets: WidgetSize[] = [
  {
    rowStart: 3,
    columnStart: 3,
    rows: 5,
    columns: 5,
  },
];

function App() {
  const [widgets, setWidgets] = useState(defaultWidgets);
  const addWidget = (newWidget: NewWidget) => {
    console.log(newWidget);
    // setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
  };
  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <BackgroundImage />
      <Wrapper>
        <NavBar addWidget={addWidget} />
        <Widgets widgets={widgets} setWidgets={setWidgets} />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
