/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import WidgetContainer from './components/WidgetContainer';
import type { Widget } from './components/WidgetContainer/types';
import { getConflictedWidgets, createArray } from './utils/lib';
import Note from './components/Widget';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(10, ${({ theme }) => theme.gridUnit}px);
  grid-template-rows: repeat(auto-fill, ${({ theme }) => theme.gridUnit}px);

  @media (min-width: 1000px) {
    grid-template-columns:
      repeat(5, ${({ theme }) => theme.gridUnit}px [left-side]) repeat(
        10,
        ${({ theme }) => theme.gridUnit}px [main]
      )
      repeat(5, ${({ theme }) => theme.gridUnit}px [right-side]);
  }
  @media (min-width: 1500px) {
    grid-template-columns:
      repeat(10, ${({ theme }) => theme.gridUnit}px [left-side]) repeat(
        10,
        ${({ theme }) => theme.gridUnit}px [main]
      )
      repeat(10, ${({ theme }) => theme.gridUnit}px [right-side]);
  }
  @media (min-width: 1800px) {
    grid-template-columns:
      repeat(13, ${({ theme }) => theme.gridUnit}px [left-side]) repeat(
        10,
        ${({ theme }) => theme.gridUnit}px [main]
      )
      repeat(13, ${({ theme }) => theme.gridUnit}px [right-side]);
  }
`;

interface WidgetsProps {
  widgets: Widget[];
  setWidgets: React.Dispatch<React.SetStateAction<Widget[]>>;
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

  const onChange = (newWidget: Widget) => {
    const newWidgets = widgets.map((widget) =>
      widget.id === newWidget.id ? { ...newWidget } : widget,
    );
    setWidgets(newWidgets);
  };

  const canWidgetMove = (newWidget: Widget): boolean => {
    const { rowStart, columnStart } = newWidget;
    if (rowStart <= 0 || columnStart <= 0) return false;
    const conflictWidgets = getConflictedWidgets(newWidget, widgets);
    return conflictWidgets.length === 0;
  };

  const switchWidgets = (targetOneIndex: number, targetTwoIndex: number) => {
    const newWidgets = [...widgets];
    newWidgets[targetOneIndex] = widgets[targetTwoIndex];
    newWidgets[targetTwoIndex] = widgets[targetOneIndex];
    setWidgets(newWidgets);
  };

  const handleConflict = (targetIndex: number, newWidget: Widget) => {
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
        <WidgetContainer
          key={widget.id}
          rowStart={widget.rowStart}
          columnStart={widget.columnStart}
          rows={widget.rows}
          columns={widget.columns}
          onChange={(newWidgetSize) =>
            onChange({ ...widget, ...newWidgetSize })
          }
          canWidgetMove={(newWidgetSize) =>
            canWidgetMove({ ...widget, ...newWidgetSize })
          }
          handleConflict={(newWidgetSize) =>
            handleConflict(index, { ...widget, ...newWidgetSize })
          }
          deleteWidget={() => deleteWidget(widget.id)}
        >
          <Note />
        </WidgetContainer>
      ))}
    </Wrapper>
  );
}

export default Widgets;
