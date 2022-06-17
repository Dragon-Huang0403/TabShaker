/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import WidgetContainer from './components/WidgetContainer';
import type { IWidgetSize } from './components/WidgetContainer';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, ${({ theme }) => theme.gridUnit}px);
  grid-template-rows: repeat(auto-fill, ${({ theme }) => theme.gridUnit}px);
  padding: 0px 50px;
  width: 100%;
  height: 100%;
`;

const defaultWidgets: IWidgetSize[] = [
  {
    rowStart: 3,
    columnStart: 3,
    rows: 2,
    columns: 2,
  },
  {
    rowStart: 6,
    columnStart: 3,
    rows: 2,
    columns: 2,
  },
];

type TRec = [number, number, number, number];

function isRectangleOverlap(rec1: TRec, rec2: TRec) {
  const height = Math.max(
    0,
    Math.min(rec1[2], rec2[2]) - Math.max(rec1[0], rec2[0]),
  );
  const width = Math.max(
    0,
    Math.min(rec1[3], rec2[3]) - Math.max(rec1[1], rec2[1]),
  );
  return height > 0 && width > 0;
}

function Widgets() {
  const [widgets, setWidgets] = useState(defaultWidgets);

  const onChange = (index: number, newWidgetSize: IWidgetSize) => {
    const newWidgets = widgets.map((widget, i) =>
      i === index ? { ...newWidgetSize } : widget,
    );
    setWidgets(newWidgets);
  };
  const getConflictItems = (index: number, newWidgetSize: IWidgetSize) => {
    const { rowStart, columnStart, rows, columns } = newWidgetSize;
    const newWidgetSizeRect: TRec = [
      rowStart,
      columnStart,
      rowStart + rows,
      columnStart + columns,
    ];
    const conflictItems = widgets.filter((widget, i) => {
      if (index === i) return false;
      const widgetSizeRect: TRec = [
        widget.rowStart,
        widget.columnStart,
        widget.rowStart + widget.rows,
        widget.columnStart + widget.columns,
      ];
      return isRectangleOverlap(newWidgetSizeRect, widgetSizeRect);
    });
    return conflictItems;
  };
  return (
    <Wrapper>
      {widgets.map((widget, index) => (
        <WidgetContainer
          key={index}
          rowStart={widget.rowStart}
          columnStart={widget.columnStart}
          rows={widget.rows}
          columns={widget.columns}
          onChange={(newWidgetSize: IWidgetSize) =>
            onChange(index, newWidgetSize)
          }
          getConflictItems={(newWidgetSize: IWidgetSize) =>
            getConflictItems(index, newWidgetSize)
          }
        >
          <div>{index}</div>
        </WidgetContainer>
      ))}
    </Wrapper>
  );
}

export default Widgets;
