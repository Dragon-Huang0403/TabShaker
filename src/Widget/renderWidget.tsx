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
      return <News data={data} />;
    default:
      return null;
  }
}

export function handleWidgetTagUpdate(
  newTag: string,
  widget: WidgetData,
): WidgetData {
  const { type } = widget;
  const newWidget = { ...widget };
  newWidget.data = { ...newWidget.data };
  if (type === 'englishCard') {
    if (newWidget.data.tag.includes(newTag)) {
      newWidget.data.tag = newWidget.data.tag.filter(
        (tag: string) => tag !== newTag,
      );
    } else {
      newWidget.data.tag = [...newWidget.data.tag, newTag];
    }
  }
  if (type === 'news') {
    newWidget.data.tag = newTag;
  }
  return newWidget;
}
