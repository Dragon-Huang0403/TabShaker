// eslint-disable-next-line import/no-cycle
import { widgetConfig } from '../Widget';

export type WidgetType = keyof typeof widgetConfig;

export type RenderWidgetData = {
  type: WidgetType;
  data: any;
  style: any;
};

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
