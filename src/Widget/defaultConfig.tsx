export default {
  clock: {
    style: {
      showSeconds: false,
    },
    data: {},
    defaultLayout: { w: 20, h: 10 },
    limit: { minW: 2, maxW: 20, minH: 1, maxH: 10 },
    menu: [],
  },
  todo: {
    style: {},
    data: { todos: [] },
    defaultLayout: { w: 10, h: 10 },
    limit: { minW: 3, maxW: 10, minH: 3, maxH: 10 },
    menu: [],
  },
  note: {
    style: {},
    data: { title: '', content: '' },
    defaultLayout: { w: 10, h: 10 },
    limit: { minW: 3, maxW: 10, minH: 3, maxH: 10 },
    menu: [],
  },
  englishCard: {
    style: {},
    data: {
      tag: [],
    },
    defaultLayout: { w: 12, h: 7 },
    limit: { minW: 11, maxW: 14, minH: 6, maxH: 9 },
    menu: ['Basic', 'Medium', 'Hard', 'Challenging'],
  },
  news: {
    style: {},
    data: {
      tag: ['United States'],
    },
    defaultLayout: { w: 12, h: 7 },
    limit: { minW: 11, maxW: 14, minH: 6, maxH: 20 },
    menu: ['Taiwan', 'United States'],
  },
  weather: {
    style: {},
    data: {},
    defaultLayout: { w: 12, h: 7 },
    limit: { minW: 11, maxW: 14, minH: 6, maxH: 20 },
    menu: [],
  },
};

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
        { text: 'Please Select me', id: '1', completed: true },
        { text: 'Please Select me', id: '2', completed: true },
        { text: 'Please Select me', id: '3', completed: true },
      ],
    },
  },
  englishCard: {
    type: 'englishCard',
    style: {},
    data: { tag: ['Basic'] },
  },
  news: {
    type: 'news',
    style: {},
    data: {
      tag: ['United States'],
    },
  },
  weather: {
    type: 'weather',
    style: {},
    data: {},
  },
} as const;
