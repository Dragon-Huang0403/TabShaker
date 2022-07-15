import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import globalTheme, { GlobalStyle } from './theme';
import NavBar from './NavBar';
import BackgroundImage from './BackgroundImage';
import GridLayout from './GridLayout';
import { ScreenSize } from './GridLayout/config';
import { defaultWidgets, defaultLayouts } from './defaultValue';
import Widget, { widgetConfig } from './Widget';
import { getAvailableWidgetTypes } from './utils/lib';
import type { WidgetData } from './types/WidgetTypes';
import type { Layouts } from './types/GridLayoutTypes';
import useLocalStorage from './hooks/useLocalStorage';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

function App() {
  const [widgets, setWidgets] = useLocalStorage<WidgetData[]>('widgets', [
    ...defaultWidgets,
  ]);
  const [layouts, setLayouts] = useLocalStorage<Layouts>(
    'layouts',
    defaultLayouts,
  );

  const addWidget = (newWidget: WidgetData) => {
    setWidgets([...widgets, newWidget]);
  };
  const deleteWidget = (id: string) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((prevWidget) => prevWidget.id !== id),
    );
    const newLayouts = { ...layouts };
    (Object.keys(newLayouts) as ScreenSize[]).forEach((screenSize) => {
      newLayouts[screenSize] = newLayouts[screenSize]?.filter(
        (layout) => layout.id !== id,
      );
    });
    setLayouts(newLayouts);
  };
  const onWidgetChange = (updatedWidget: WidgetData) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((prevWidget) =>
        prevWidget.id === updatedWidget.id ? updatedWidget : prevWidget,
      ),
    );
  };

  const availableWidgets = getAvailableWidgetTypes(widgets, widgetConfig);

  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <BackgroundImage />
      <Wrapper>
        <NavBar addWidget={addWidget} availableWidgets={availableWidgets} />
        <GridLayout widgets={widgets} layouts={layouts} setLayouts={setLayouts}>
          {widgets.map((widget) => (
            <Widget
              key={widget.id}
              widget={widget}
              deleteWidget={() => deleteWidget(widget.id)}
              onWidgetChange={onWidgetChange}
            />
          ))}
        </GridLayout>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
