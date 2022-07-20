import { widgetConfig } from '../Widget';
import type { NewsWidgetData } from '../Widget/News';
import type { NoteWidgetData } from '../Widget/Note';
import type { TodoWidgetData } from '../Widget/Todo';
import type { EnglishCardWidgetData } from '../Widget/EnglishCard';
import type { ClockStyle } from '../Widget/Clock';

export type WidgetType = keyof typeof widgetConfig;

export interface RenderWidgetData {
  type: WidgetType;
  data:
    | NewsWidgetData
    | NoteWidgetData
    | TodoWidgetData
    | EnglishCardWidgetData
    | {};
  style: ClockStyle | {};
}

export type WidgetData = {
  id: string;
  defaultLayout: { w: number; h: number };
  limit: { minW: number; maxW: number; minH: number; maxH: number };
  menu: string[];
} & RenderWidgetData;

export type TodoData = {
  id: string;
  text: string;
  completed: boolean;
};

export type NoteData = {
  title: string;
  content: string;
};
