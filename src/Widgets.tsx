/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import type { WidgetData } from './components/WidgetContainer/types';
import {
  getConflictedWidgets,
  createArray,
  maxNumberOfColumns,
  maxNumberOfRows,
} from './utils/lib';
import Widget from './components/Widget';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(
    36,
    minmax(15px, ${({ theme }) => theme.gridUnit}px)
  );
  grid-template-rows: repeat(
    19,
    minmax(15px, ${({ theme }) => theme.gridUnit}px)
  );
`;

interface WidgetsProps {
  widgets: WidgetData[];
  setWidgets: React.Dispatch<React.SetStateAction<WidgetData[]>>;
}

function Widgets({ widgets, setWidgets }: WidgetsProps) {
  const switchedWidgetsRef = useRef<string[]>([]);

  useEffect(() => {
    if (switchedWidgetsRef.current.length !== widgets.length) {
      switchedWidgetsRef.current = createArray(widgets.length);
    }
  }, [widgets]);

  const deleteWidget = (id: string) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((prevWidget) => prevWidget.id !== id),
    );
  };

  const onChange = (newWidget: WidgetData) => {
    const newWidgets = widgets.map((widget) =>
      widget.id === newWidget.id ? { ...newWidget } : widget,
    );
    setWidgets(newWidgets);
  };

  const canWidgetMove = (newWidget: WidgetData): boolean => {
    const { rowStart, columnStart, rows, columns } = newWidget;
    const rowEnd = rowStart + rows;
    const columnEnd = columnStart + columns;
    if (rowStart <= 0 || columnStart <= 0) return false;
    if (columnEnd > maxNumberOfColumns || rowEnd > maxNumberOfRows)
      return false;
    const conflictWidgets = getConflictedWidgets(newWidget, widgets);
    return conflictWidgets.length === 0;
  };

  const switchWidgets = (targetOneIndex: number, targetTwoIndex: number) => {
    const newWidgets = [...widgets];
    newWidgets[targetOneIndex] = widgets[targetTwoIndex];
    newWidgets[targetTwoIndex] = widgets[targetOneIndex];
    setWidgets(newWidgets);
  };

  const handleConflict = (targetIndex: number, newWidget: WidgetData) => {
    const conflictWidgets = getConflictedWidgets(newWidget, widgets);
    if (conflictWidgets.length === 0) return;

    conflictWidgets.forEach((conflictWidget) => {
      if (!switchedWidgetsRef.current[conflictWidget.index]) {
        switchedWidgetsRef.current[conflictWidget.index] = 'firstConflict';
        setTimeout(() => {
          switchedWidgetsRef.current[conflictWidget.index] = 'canMove';
        }, 500);
        return;
      }

      if (switchedWidgetsRef.current[conflictWidget.index] !== 'canMove')
        return;

      const {
        rowStart,
        columnStart,
        rows,
        columns,
        overLayColumns,
        overLayRows,
      } = conflictWidget;

      if (
        rows === newWidget.rows &&
        columns === newWidget.columns &&
        rows === overLayRows &&
        columns === overLayColumns
      ) {
        switchWidgets(conflictWidget.index, targetIndex);
        return;
      }

      const newConflictWidgetSize = { ...conflictWidget };

      if (overLayRows < overLayColumns) {
        if (rowStart > newWidget.rowStart) {
          newConflictWidgetSize.rowStart += overLayRows;
        } else {
          newConflictWidgetSize.rowStart -= overLayRows;
        }
        if (canWidgetMove(newConflictWidgetSize)) {
          switchedWidgetsRef.current[conflictWidget.index] = '';
          setWidgets((prevWidgets) =>
            prevWidgets.map((prevWidget, index) =>
              index === conflictWidget.index
                ? { ...newWidget, ...newConflictWidgetSize }
                : prevWidget,
            ),
          );
          return;
        }
        newConflictWidgetSize.rowStart = rowStart;
      }

      if (columnStart > newWidget.columnStart) {
        newConflictWidgetSize.columnStart += overLayColumns;
      } else {
        newConflictWidgetSize.columnStart -= overLayColumns;
      }

      if (!canWidgetMove(newConflictWidgetSize)) return;
      switchedWidgetsRef.current[conflictWidget.index] = '';
      setWidgets((prevWidgets) =>
        prevWidgets.map((prevWidget, index) =>
          index === conflictWidget.index
            ? { ...newWidget, ...newConflictWidgetSize }
            : prevWidget,
        ),
      );
    });
  };

  return (
    <Wrapper>
      {widgets.map((widget, index) => (
        <Widget
          key={widget.id}
          widget={widget}
          onChange={onChange}
          canWidgetMove={canWidgetMove}
          handleConflict={(newWidget) => handleConflict(index, newWidget)}
          deleteWidget={deleteWidget}
        />
      ))}
    </Wrapper>
  );
}

export default Widgets;
