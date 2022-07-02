import React from 'react';
import type { WidgetData } from '../types/WidgetTypes';
import Clock from './Clock';
import Note from './Note';
import Todo from './Todo';
import EnglishCard from './EnglishCard';
import News from './News';

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
    case 'englishCard':
      return <EnglishCard data={data} />;
    case 'news':
      return <News />;
    default:
      return null;
  }
}
