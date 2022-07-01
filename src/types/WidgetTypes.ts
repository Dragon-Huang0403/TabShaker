export type WidgetType = 'note' | 'todo' | 'clock' | 'englishCard';

export type WidgetData = {
  id: string;
  type: WidgetType;
  style: any;
  data: any;
  defaultLayout: { w: number; h: number };
  limit: { minW: number; maxW: number; minH: number; maxH: number };
  menu: string[];
};

export type EnglishWordData = {
  id: string;
  word: string;
  ipa: string;
  type: string;
  chinese: string;
  definition: string;
  example: string;
  example_chinese: string;
  tags: string[];
};
