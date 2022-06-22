/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import WidgetContainer from './components/WidgetContainer';
import type { WidgetSize } from './components/WidgetContainer/types';
import { calculateOverlapArea, createArray } from './utils/lib';
import Note from './components/Widget';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(36, ${({ theme }) => theme.gridUnit}px);
  grid-template-rows: repeat(19, ${({ theme }) => theme.gridUnit}px);
  padding: 0px 50px;
  width: 100%;
  height: 100%;
`;

interface ConflictItem extends WidgetSize {
  overLayRows: number;
  overLayColumns: number;
  index: number;
}

function getConflictItems(
  targetIndex: number,
  newWidgetSize: WidgetSize,
  widgets: WidgetSize[],
): ConflictItem[] {
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
      return [...accu, { ...widget, ...overlayArea, index }];
    }
    return accu;
  }, [] as ConflictItem[]);
  return conflictItems;
}

interface WidgetsProps {
  widgets: WidgetSize[];
  setWidgets: React.Dispatch<React.SetStateAction<WidgetSize[]>>;
}

function Widgets({ widgets, setWidgets }: WidgetsProps) {
  const switchedWidgetsRef = useRef<string[]>([]);

  useEffect(() => {
    if (switchedWidgetsRef.current.length !== widgets.length) {
      switchedWidgetsRef.current = createArray(widgets.length);
    }
  }, [widgets]);

  const deleteWidget = (targetIndex: number) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((_, index) => index !== targetIndex),
    );
  };

  const onChange = (index: number, newWidgetSize: WidgetSize) => {
    const newWidgets = widgets.map((widget, i) =>
      i === index ? { ...newWidgetSize } : widget,
    );
    setWidgets(newWidgets);
  };

  const canWidgetMove = (
    targetIndex: number,
    newWidgetSize: WidgetSize,
  ): boolean => {
    const { rowStart, columnStart } = newWidgetSize;
    if (rowStart <= 0 || columnStart <= 0) return false;
    const conflictWidgets = getConflictItems(
      targetIndex,
      newWidgetSize,
      widgets,
    );
    return conflictWidgets.length === 0;
  };

  const switchWidgets = (targetOneIndex: number, targetTwoIndex: number) => {
    const newWidgets = [...widgets];
    newWidgets[targetOneIndex] = widgets[targetTwoIndex];
    newWidgets[targetTwoIndex] = widgets[targetOneIndex];
    setWidgets(newWidgets);
  };

  const handleConflict = (targetIndex: number, newWidgetSize: WidgetSize) => {
    const conflictWidgets = getConflictItems(
      targetIndex,
      newWidgetSize,
      widgets,
    );
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
        rows === newWidgetSize.rows &&
        columns === newWidgetSize.columns &&
        rows === overLayRows &&
        columns === overLayColumns
      ) {
        switchWidgets(conflictWidget.index, targetIndex);
        return;
      }

      const newConflictWidgetSize = { rowStart, columnStart, rows, columns };

      if (overLayRows < overLayColumns) {
        if (rowStart > newWidgetSize.rowStart) {
          newConflictWidgetSize.rowStart += overLayRows;
        } else {
          newConflictWidgetSize.rowStart -= overLayRows;
        }
        if (canWidgetMove(conflictWidget.index, newConflictWidgetSize)) {
          switchedWidgetsRef.current[conflictWidget.index] = '';
          setWidgets((prevWidgets) =>
            prevWidgets.map((prevWidget, index) =>
              index === conflictWidget.index
                ? newConflictWidgetSize
                : prevWidget,
            ),
          );
          return;
        }
        newConflictWidgetSize.rowStart = rowStart;
      }

      if (columnStart > newWidgetSize.columnStart) {
        newConflictWidgetSize.columnStart += overLayColumns;
      } else {
        newConflictWidgetSize.columnStart -= overLayColumns;
      }

      if (!canWidgetMove(conflictWidget.index, newConflictWidgetSize)) return;
      switchedWidgetsRef.current[conflictWidget.index] = '';
      setWidgets((prevWidgets) =>
        prevWidgets.map((prevWidget, index) =>
          index === conflictWidget.index ? newConflictWidgetSize : prevWidget,
        ),
      );
    });
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
          onChange={(newWidgetSize) => onChange(index, newWidgetSize)}
          canWidgetMove={(newWidgetSize) => canWidgetMove(index, newWidgetSize)}
          handleConflict={(newWidgetSize) =>
            handleConflict(index, newWidgetSize)
          }
          deleteWidget={() => deleteWidget(index)}
        >
          <Note />
        </WidgetContainer>
      ))}
    </Wrapper>
  );
}

export default Widgets;
