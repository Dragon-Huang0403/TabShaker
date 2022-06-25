import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { v4 } from 'uuid';
import type { NewWidget, WidgetData } from './components/WidgetContainer/types';
import globalTheme, { GlobalStyle } from './theme';
import NavBar from './NavBar';
import Widgets from './Widgets';
import BackgroundImage from './BackgroundImage';
import { getAvailablePosition } from './utils/lib';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

function App() {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const addWidget = (newWidget: NewWidget) => {
    const newWidgetSize = getAvailablePosition(widgets, newWidget);
    if (!newWidgetSize) {
      // No space for new Widget
      return;
    }
    setWidgets([...widgets, { ...newWidget, ...newWidgetSize, id: v4() }]);
  };
  useEffect(() => {
    const rawData = window.localStorage.getItem('widgetData');
    if (!rawData) return;
    const oldWidget = JSON.parse(rawData);
    setWidgets(oldWidget);
  }, []);

  useEffect(() => {
    if (widgets.length === 0) return;
    window.localStorage.setItem('widgetData', JSON.stringify(widgets));
  }, [widgets]);
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
