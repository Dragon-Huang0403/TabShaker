/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import WidgetContainer from './components/WidgetContainer';
import type { WidgetSize } from './components/WidgetContainer';
import { calculateOverlapArea } from './utils/lib';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, ${({ theme }) => theme.gridUnit}px);
  grid-template-rows: repeat(auto-fill, ${({ theme }) => theme.gridUnit}px);
  padding: 0px 50px;
  width: 100%;
  height: 100%;
`;

const defaultWidgets: WidgetSize[] = [
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

interface ConflictItem extends WidgetSize {
  row: number;
  column: number;
}

function getConflictItems(
  targetIndex: number,
  newWidgetSize: WidgetSize,
  widgets: WidgetSize[],
) {
  const { rowStart, columnStart, rows, columns } = newWidgetSize;
  const newWidgetSizeRect = [
    rowStart,
    columnStart,
    rowStart + rows,
    columnStart + columns,
  ];
  const conflictItems = widgets.reduce((accu, widget, index) => {
    if (targetIndex === index) return accu;
    const widgetSizeRect = [
      widget.rowStart,
      widget.columnStart,
      widget.rowStart + widget.rows,
      widget.columnStart + widget.columns,
    ];
    const overlayArea = calculateOverlapArea(newWidgetSizeRect, widgetSizeRect);
    if (overlayArea) {
      return [...accu, { ...widget, ...overlayArea }];
    }
    return accu;
  }, [] as ConflictItem[]);
  return conflictItems;
}

function Widgets() {
  const [widgets, setWidgets] = useState(defaultWidgets);

  const onChange = (index: number, newWidgetSize: WidgetSize) => {
    const newWidgets = widgets.map((widget, i) =>
      i === index ? { ...newWidgetSize } : widget,
    );
    setWidgets(newWidgets);
  };

  const canWidgetMove = (targetIndex: number, newWidgetSize: WidgetSize) => {
    const conflictItems = getConflictItems(targetIndex, newWidgetSize, widgets);
    if (conflictItems.length === 0) {
      return true;
    }
    return false;
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
          onChange={(newWidgetSize: WidgetSize) =>
            onChange(index, newWidgetSize)
          }
          canWidgetMove={(newWidgetSize: WidgetSize) =>
            canWidgetMove(index, newWidgetSize)
          }
        >
          <div>{index}</div>
        </WidgetContainer>
      ))}
    </Wrapper>
  );
}

export default Widgets;
