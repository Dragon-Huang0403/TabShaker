export default {
  clock: {
    style: {
      showSeconds: false,
    },
    data: {},
    defaultLayout: { w: 20, h: 10 },
    limit: { minW: 2, maxW: 20, minH: 1, maxH: 10 },
  },
  todo: {
    w: 4,
    h: 4,
    style: {},
    data: { todos: [] },
    defaultLayout: { w: 10, h: 10 },
    limit: { minW: 3, maxW: 10, minH: 3, maxH: 10 },
  },
  note: {
    style: {},
    data: { title: '', content: '' },
    defaultLayout: { w: 10, h: 10 },
    limit: { minW: 3, maxW: 10, minH: 3, maxH: 10 },
  },
  englishCard: {
    style: {},
    data: {},
    defaultLayout: { w: 12, h: 7 },
    limit: { minW: 11, maxW: 14, minH: 6, maxH: 9 },
  },
};
