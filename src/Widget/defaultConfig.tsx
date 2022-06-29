export default {
  clock: {
    style: {
      showSeconds: true,
    },
    data: {},
    defaultLayout: { w: 10, h: 5 },
    limit: { minW: 2, maxW: 20, minH: 1, maxH: 10 },
  },
  todo: {
    w: 4,
    h: 4,
    style: {},
    data: { todos: [] },
    defaultLayout: { w: 4, h: 4 },
    limit: { minW: 3, maxW: 10, minH: 3, maxH: 10 },
  },
  note: {
    style: {},
    data: { title: '', content: '' },
    defaultLayout: { w: 4, h: 4 },
    limit: { minW: 3, maxW: 10, minH: 3, maxH: 10 },
  },
};
