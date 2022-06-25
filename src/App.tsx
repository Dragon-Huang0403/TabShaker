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

const defaultWidget: WidgetData[] = [
  {
    type: 'clock',
    columns: 13,
    rows: 6,
    style: { showSeconds: true },
    data: {},
    rowStart: 2,
    columnStart: 12,
    id: '305d28ed-27d6-4941-b5ac-651c02e2eea8',
  },
  {
    type: 'todo',
    columns: 4,
    rows: 4,
    style: {},
    data: { todos: [] },
    rowStart: 12,
    columnStart: 28,
    id: '6df09026-9e2e-40b9-9561-9ab84a6245fe',
  },
  {
    type: 'note',
    columns: 4,
    rows: 4,
    style: {},
    data: { title: '', content: '' },
    rowStart: 12,
    columnStart: 32,
    id: '411ddfa0-0f22-456d-a019-18fe0f323851',
  },
];

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
    if (!rawData) {
      setWidgets(defaultWidget);
      return;
    }
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
