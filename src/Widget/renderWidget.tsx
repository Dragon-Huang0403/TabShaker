import React from 'react';
import Clock, { ClockStyle } from './Clock';
import Note, { NoteWidgetData } from './Note';
import Todo, { TodoWidgetData } from './Todo';
import EnglishCard, { EnglishCardWidgetData } from './EnglishCard';
import News, { NewsWidgetData } from './News';
import Weather from './Weather';
import Calendar from './Calendar';

import type { RenderWidgetData, WidgetData } from '../types/WidgetTypes';

export default function renderWidget(
  widget: RenderWidgetData,
  onWidgetChange: (data: any) => void = () => {},
  width: number = -1,
  height: number = -1,
) {
  const { type, data, style } = widget;
  switch (type) {
    case 'clock':
      return <Clock style={style as ClockStyle} />;
    case 'note':
      return (
        <Note data={data as NoteWidgetData} onWidgetChange={onWidgetChange} />
      );
    case 'todo':
      return (
        <Todo data={data as TodoWidgetData} onWidgetChange={onWidgetChange} />
      );
    case 'englishCard':
      return <EnglishCard data={data as EnglishCardWidgetData} />;
    case 'news':
      return <News data={data as NewsWidgetData} />;
    case 'weather':
      return <Weather width={width} height={height} />;
    case 'calendar':
      return <Calendar width={width} />;
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
  if (type === 'englishCard') {
    let tags = (newWidget.data as EnglishCardWidgetData).tag;
    if (tags.includes(newTag)) {
      tags = tags.filter((tag: string) => tag !== newTag);
    } else {
      tags = [...tags, newTag];
    }
    newWidget.data = { tag: tags };
    return newWidget;
  }
  if (type === 'news') {
    newWidget.data = { tag: newTag };
    return newWidget;
  }
  return widget;
}
