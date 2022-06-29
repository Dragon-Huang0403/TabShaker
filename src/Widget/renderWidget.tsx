import React from 'react';
import type { WidgetData } from '../types/WidgetTypes';
import Clock from './Clock';
import Note from './Note';
import Todo from './Todo';

export default function renderWidget(
  widget: WidgetData,
  onWidgetChange: (data: any) => void,
) {
  const { type, data, style } = widget;
  switch (type) {
    case 'clock':
      return <Clock style={style} />;
    case 'note':
      return <Note data={data} onWidgetChange={onWidgetChange} />;
    case 'todo':
      return <Todo data={data} onWidgetChange={onWidgetChange} />;
    default:
      return null;
  }
}
