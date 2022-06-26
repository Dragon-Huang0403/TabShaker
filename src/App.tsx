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
import type { WidgetType } from './types/WidgetTypes';
import type { GridItemPosition } from './types/GridLayoutTypes';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

const defaultWidgets: WidgetType[] = [
  { position: { x: 10, y: 10, w: 200, h: 200 }, id: v4() },
];

const TestWrapper = styled.div`
  background: grey;
`;

function App() {
  const [widgets, setWidgets] = useState<WidgetType[]>([]);
  useEffect(() => {
    if (widgets.length === 0) {
      setWidgets(defaultWidgets);
    }
  }, []);

  const onPositionChange = (newPosition: GridItemPosition, id: string) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((prevWidget) =>
        prevWidget.id === id
          ? { ...prevWidget, position: newPosition }
          : prevWidget,
      ),
    );
  };
  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <BackgroundImage />
      <Wrapper>
        {/* <NavBar addWidget={addWidget} /> */}
        {/* <Widgets widgets={widgets} setWidgets={setWidgets} /> */}
        <GridLayout layout={widgets} onPositionChange={onPositionChange}>
          {widgets.map((widget) => (
            <TestWrapper key={widget.id}>123</TestWrapper>
          ))}
        </GridLayout>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
