import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import globalTheme, { GlobalStyle } from './theme';
import Widget, { widgetConfig } from './Widget';
import NavBar from './layout/NavBar';
import Background from './layout/Background';
import GridLayout from './GridLayout';
import { ScreenSize } from './GridLayout/config';
import { defaultWidgets, defaultLayouts } from './defaultValue';
import { getAvailableWidgetTypes } from './utils/lib';
import { useLocalStorage } from './hooks';

import type { WidgetData } from './types/WidgetTypes';
import type { Layouts } from './types/GridLayoutTypes';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

function App() {
  const [widgets, setWidgets] = useLocalStorage<WidgetData[]>('widgetData', [
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

  const getLayoutLimit = (id: string) => {
    const targetWidget = widgets.find((widget) => widget.id === id)!;
    const { limit } = widgetConfig[targetWidget.type];
    return limit;
  };

  const getWidgetDefaultLayout = (id: string) => {
    const targetWidget = widgets.find((widget) => widget.id === id)!;
    const { defaultLayout } = widgetConfig[targetWidget.type];
    return defaultLayout;
  };

  const availableWidgets = getAvailableWidgetTypes(widgets, widgetConfig);

  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <Background />
      <Wrapper>
        <NavBar addWidget={addWidget} availableWidgets={availableWidgets} />
        <GridLayout
          layouts={layouts}
          setLayouts={setLayouts}
          getLayoutLimit={getLayoutLimit}
          getWidgetDefaultLayout={getWidgetDefaultLayout}
        >
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
