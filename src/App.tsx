import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import globalTheme, { GlobalStyle } from './theme';
import NavBar from './NavBar';
import BackgroundImage from './BackgroundImage';
import GridLayout from './GridLayout';
import { defaultLayout } from './GridLayout/config';
import Widget from './Widget';
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
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const [layouts, setLayouts] = useState<Layouts>(defaultLayout);

  const addWidget = (newWidget: WidgetData) => {
    setWidgets([...widgets, newWidget]);
  };
  const deleteWidget = (id: string) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((prevWidget) => prevWidget.id !== id),
    );
    const newLayouts = { ...layouts };
    Object.keys(newLayouts).forEach((screenSize) => {
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

  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <BackgroundImage />
      <Wrapper>
        <NavBar addWidget={addWidget} />
        {/* <Widgets widgets={widgets} setWidgets={setWidgets} /> */}
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
