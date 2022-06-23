import React from 'react';
import WidgetContainer from '../WidgetContainer';
import type { WidgetData } from '../WidgetContainer/types';
import Note, * as note from './Note';
import Todo, * as todo from './Todo';

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
      return <Note />;
    case 'todo':
      return <Todo />;
    default:
      return null;
  }
}
function getWidgetLimit(type: string) {
  switch (type) {
    case 'note':
      return note.limit;
    case 'todo':
      return todo.limit;
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
  const widgetLimit = getWidgetLimit(type);
  if (!renderedWidget || !widgetLimit) return null;
  return (
    <WidgetContainer
      limit={widgetLimit}
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
      {renderedWidget}
    </WidgetContainer>
  );
}

export default Widget;
