export type WidgetType = 'note' | 'todo' | 'clock' | 'englishCard';

export type WidgetData = {
  id: string;
  type: WidgetType;
  style: any;
  data: any;
  defaultLayout: { w: number; h: number };
  limit: { minW: number; maxW: number; minH: number; maxH: number };
};
