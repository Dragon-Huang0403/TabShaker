import React from 'react';
import WidgetContainer from '../WidgetContainer';
import type { WidgetData } from '../WidgetContainer/types';
import note from './Note';
import todo from './Todo';
import clock from './Clock';

interface WidgetProps {
  widget: WidgetData;
  onChange: (newWidget: WidgetData) => void;
  canWidgetMove: (newWidget: WidgetData) => boolean;
  handleConflict: (newWidget: WidgetData) => void;
  deleteWidget: (id: string) => void;
}

function getWidget(type: string) {
  switch (type) {
    case 'note':
      return note;
    case 'todo':
      return todo;
    case 'clock':
      return clock;
    default:
      return null;
  }
}

function Widget({
  widget,
  onChange,
  canWidgetMove,
  handleConflict,
  deleteWidget,
}: WidgetProps) {
  const { type, id, rowStart, columnStart, rows, columns } = widget;
  const renderedWidget = getWidget(type);
  if (!renderedWidget) return null;
  const { component, limit } = renderedWidget;

  return (
    <WidgetContainer
      limit={limit}
      rowStart={rowStart}
      columnStart={columnStart}
      rows={rows}
      columns={columns}
      onChange={(newWidgetSize) => onChange({ ...widget, ...newWidgetSize })}
      canWidgetMove={(newWidgetSize) =>
        canWidgetMove({ ...widget, ...newWidgetSize })
      }
      handleConflict={(newWidgetSize) =>
        handleConflict({ ...widget, ...newWidgetSize })
      }
      deleteWidget={() => deleteWidget(id)}
    >
      {component()}
    </WidgetContainer>
  );
}

export default Widget;
