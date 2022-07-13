export default {
  clock: {
    style: {
      showSeconds: false,
    },
    data: {},
    defaultLayout: { w: 20, h: 10 },
    limit: { minW: 2, maxW: 40, minH: 1, maxH: 20 },
    menu: [] as string[],
    maxQuantity: 1,
  },
  todo: {
    style: {},
    data: { todos: [], title: 'Inbox' },
    defaultLayout: { w: 10, h: 10 },
    limit: { minW: 3, maxW: 15, minH: 3, maxH: 15 },
    menu: [] as string[],
    maxQuantity: 3,
  },
  note: {
    style: {},
    data: { title: '', content: '' },
    defaultLayout: { w: 10, h: 10 },
    limit: { minW: 3, maxW: 30, minH: 3, maxH: 30 },
    menu: [] as string[],
    maxQuantity: 3,
  },
  englishCard: {
    style: {},
    data: {
      tag: [],
    },
    defaultLayout: { w: 13, h: 9 },
    limit: { minW: 11, maxW: 15, minH: 6, maxH: 11 },
    menu: ['Basic', 'Medium', 'Hard', 'Challenging'] as string[],
    maxQuantity: 2,
  },
  news: {
    style: {},
    data: {
      tag: ['United States'],
    },
    defaultLayout: { w: 13, h: 12 },
    limit: { minW: 11, maxW: 16, minH: 8, maxH: 30 },
    menu: ['Taiwan', 'United States'] as string[],
    maxQuantity: 2,
  },
  weather: {
    style: {},
    data: {},
    defaultLayout: { w: 13, h: 8 },
    limit: { minW: 5, maxW: 16, minH: 4, maxH: 10 },
    menu: [] as string[],
    maxQuantity: 1,
  },
  calendar: {
    style: {},
    data: {},
    defaultLayout: { w: 14, h: 12 },
    limit: { minW: 11, maxW: 25, minH: 10, maxH: 30 },
    menu: [] as string[],
    maxQuantity: 1,
  },
} as const;

export const widgetDemo = {
  clock: {
    type: 'clock',
    text: 'Clock',
    style: {
      showSeconds: false,
    },
    data: {},
  },
  note: {
    type: 'note',
    text: 'Note',
    style: {},
    data: {
      title: '',
      content: '',
    },
  },
  todo: {
    type: 'todo',
    text: 'Todo List',
    style: {},
    data: {
      todos: [
        { text: 'Please Select Me', id: '1', completed: true },
        { text: 'Please Select Me', id: '2', completed: true },
        { text: 'Please Select Me', id: '3', completed: true },
      ],
      title: 'Inbox',
    },
  },
  englishCard: {
    type: 'englishCard',
    text: 'English Card',
    style: {},
    data: { tag: ['Basic'] },
  },
  news: {
    type: 'news',
    text: 'News',
    style: {},
    data: {
      tag: ['United States'],
    },
  },
  weather: {
    type: 'weather',
    text: 'Weather',
    style: {},
    data: {},
  },
  calendar: {
    type: 'calendar',
    text: 'Calendar',
    style: {},
    data: {},
  },
} as const;
