import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { v4 } from 'uuid';
// import type { NewWidget, WidgetData } from './components/WidgetContainer/types';
import globalTheme, { GlobalStyle } from './theme';
// import NavBar from './NavBar';
// import Widgets from './Widgets';
import BackgroundImage from './BackgroundImage';
// import { getAvailablePosition } from './utils/lib';
import GridLayout from './GridLayout';
import type { WidgetData } from './types/WidgetTypes';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

const defaultWidgets: WidgetData[] = [
  {
    id: v4(),
  },
  {
    id: v4(),
  },
];

const TestWrapper = styled.div`
  position: absolute;
  background: grey;
`;

function App() {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);

  useEffect(() => {
    if (widgets.length === 0) {
      setWidgets(defaultWidgets);
    }
  }, []);

  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <BackgroundImage />
      <Wrapper>
        {/* <NavBar addWidget={addWidget} /> */}
        {/* <Widgets widgets={widgets} setWidgets={setWidgets} /> */}
        <GridLayout>
          {widgets.map((widget) => (
            <TestWrapper key={widget.id} />
          ))}
        </GridLayout>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
