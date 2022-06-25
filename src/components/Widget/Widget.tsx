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

const widgetType = { note, todo, clock };

function Widget({
  widget,
  onChange,
  canWidgetMove,
  handleConflict,
  deleteWidget,
}: WidgetProps) {
  const { type, id, rowStart, columnStart, rows, columns } = widget;
  const renderedWidget = widgetType[type];
  const { RenderedWidget, limit } = renderedWidget;

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
      <RenderedWidget
        widgetOnChange={(changedData) => {
          onChange({ ...widget, data: { ...widget.data, ...changedData } });
        }}
        data={widget.data}
      />
    </WidgetContainer>
  );
}

export default Widget;
