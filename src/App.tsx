import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import type { WidgetSize, NewWidget } from './components/WidgetContainer/types';
import globalTheme, { GlobalStyle } from './theme';
import NavBar from './NavBar';
import Widgets from './Widgets';
import BackgroundImage from './BackgroundImage';
import { calculateOverlapArea } from './utils/lib';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

const defaultWidgets: WidgetSize[] = [
  {
    rowStart: 1,
    columnStart: 1,
    rows: 5,
    columns: 5,
  },
];

const maxNumberOfColumns = 36;
const maxNumberOfRows = 19;

function getAvailablePosition(
  widgets: WidgetSize[],
  newWidget: NewWidget,
  newWidgetStartRow = 1,
  newWidgetStartColumn = 1,
): WidgetSize | null {
  const newWidgetSizeRowEnd = newWidgetStartRow + newWidget.rows;
  const newWidgetSizeColumnEnd = newWidgetStartColumn + newWidget.columns;
  const newWidgetSizeRect = [
    newWidgetStartRow,
    newWidgetStartColumn,
    newWidgetSizeRowEnd,
    newWidgetSizeColumnEnd,
  ];
  const conflictItemIndex = widgets.findIndex(
    ({ rowStart, columnStart, rows, columns }) => {
      const widgetSizeRect = [
        rowStart,
        columnStart,
        rowStart + rows,
        columnStart + columns,
      ];
      const result = calculateOverlapArea(newWidgetSizeRect, widgetSizeRect);
      return result;
    },
  );
  if (conflictItemIndex === -1) {
    return {
      rows: newWidget.rows,
      columns: newWidget.columns,
      rowStart: newWidgetStartRow,
      columnStart: newWidgetStartColumn,
    };
  }
  let nextNewWidgetStartColumn = newWidgetStartColumn + 1;
  let nextNewWidgetStartRow = newWidgetStartRow;
  if (newWidgetSizeColumnEnd >= maxNumberOfColumns) {
    nextNewWidgetStartColumn = 1;
    nextNewWidgetStartRow += 1;
    if (newWidgetSizeRowEnd >= maxNumberOfRows) {
      return null;
    }
  }
  return getAvailablePosition(
    widgets,
    newWidget,
    nextNewWidgetStartRow,
    nextNewWidgetStartColumn,
  );
}

function App() {
  const [widgets, setWidgets] = useState(defaultWidgets);
  const addWidget = (newWidget: NewWidget) => {
    const newWidgetSize = getAvailablePosition(widgets, newWidget);
    if (!newWidgetSize) return;
    setWidgets([...widgets, newWidgetSize]);
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
