import React from 'react';
import WidgetContainer from '../WidgetContainer';
import type { WidgetData } from '../WidgetContainer/types';
import Note, * as note from './Note';

interface WidgetProps {
  widget: WidgetData;
  onChange: (newWidget: WidgetData) => void;
  canWidgetMove: (newWidget: WidgetData) => boolean;
  handleConflict: (newWidget: WidgetData) => void;
  deleteWidget: (id: string) => void;
}

function Widget({
  widget,
  onChange,
  canWidgetMove,
  handleConflict,
  deleteWidget,
}: WidgetProps) {
  const { type, id, rowStart, columnStart, rows, columns } = widget;
  if (type === 'note') {
    const widgetLimit = note.config;
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
        <Note />
      </WidgetContainer>
    );
  }
  return null;
}

export default Widget;
