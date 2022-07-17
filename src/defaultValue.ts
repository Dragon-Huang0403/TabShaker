export const defaultWidgets = [
  {
    type: 'note',
    style: {},
    data: {
      title: 'TabShaker',
      content:
        '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Customized your Tab ✌️✌️","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Move / Resize","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" widgets","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Add new widget","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"🧰 (left-top corner)","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Remove ","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"widget (widget\'s menu)","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Different screen size different layout","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":4}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Widgets","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"News 📰📰📰","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Weather☁️","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Calendar✨✨","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Todo List ✅ ✅ ✅ ","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":4},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"English Card 🧠🧠","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":5},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Clock🕛🕛","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":6},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Note 📓","type":"text","version":1}],"direction":"ltr","format":"","indent":1,"type":"listitem","version":1,"value":7}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    },
    defaultLayout: { w: 10, h: 10 },
    limit: { minW: 3, maxW: 30, minH: 3, maxH: 30 },
    menu: [] as string[],
    maxQuantity: 3,
    id: '3b18ec5a-77bd-4e6c-84c6-c6c72c09cfb1',
  },
  {
    type: 'clock',
    style: { showSeconds: false },
    data: {},
    defaultLayout: { w: 20, h: 10 },
    limit: { minW: 2, maxW: 40, minH: 1, maxH: 20 },
    menu: [] as string[],
    maxQuantity: 1,
    id: '77c31f20-6de7-47a0-878e-9133bdc9414d',
  },
  {
    type: 'weather',
    style: {},
    data: {},
    defaultLayout: { w: 13, h: 8 },
    limit: { minW: 5, maxW: 16, minH: 4, maxH: 10 },
    menu: [] as string[],
    maxQuantity: 1,
    id: 'f4435c1e-a921-4012-b341-4dd8687ae340',
  },
] as const;

export const defaultLayouts = {
  sm: [
    { x: 7, y: 10, w: 13, h: 6, id: '3b18ec5a-77bd-4e6c-84c6-c6c72c09cfb1' },
    { x: 0, y: 0, w: 20, h: 10, id: '77c31f20-6de7-47a0-878e-9133bdc9414d' },
    { x: 0, y: 10, w: 7, h: 6, id: 'f4435c1e-a921-4012-b341-4dd8687ae340' },
  ],
  m: [
    { x: 11, y: 10, w: 15, h: 8, id: '3b18ec5a-77bd-4e6c-84c6-c6c72c09cfb1' },
    { x: 0, y: 0, w: 26, h: 10, id: '77c31f20-6de7-47a0-878e-9133bdc9414d' },
    { x: 0, y: 10, w: 11, h: 8, id: 'f4435c1e-a921-4012-b341-4dd8687ae340' },
  ],
  md: [
    { x: 1, y: 10, w: 21, h: 15, id: '3b18ec5a-77bd-4e6c-84c6-c6c72c09cfb1' },
    { x: 1, y: 0, w: 21, h: 10, id: '77c31f20-6de7-47a0-878e-9133bdc9414d' },
    { x: 22, y: 0, w: 10, h: 7, id: 'f4435c1e-a921-4012-b341-4dd8687ae340' },
  ],
  l: [
    { x: 0, y: 10, w: 17, h: 15, id: '3b18ec5a-77bd-4e6c-84c6-c6c72c09cfb1' },
    { x: 0, y: 0, w: 21, h: 10, id: '77c31f20-6de7-47a0-878e-9133bdc9414d' },
    { w: 13, h: 8, x: 21, y: 0, id: 'f4435c1e-a921-4012-b341-4dd8687ae340' },
  ],
  lg: [
    { x: 0, y: 0, w: 17, h: 16, id: '3b18ec5a-77bd-4e6c-84c6-c6c72c09cfb1' },
    { x: 17, y: 0, w: 18, h: 10, id: '77c31f20-6de7-47a0-878e-9133bdc9414d' },
    { x: 35, y: 0, w: 12, h: 8, id: 'f4435c1e-a921-4012-b341-4dd8687ae340' },
  ],
  xl: [
    { x: 6, y: 0, w: 19, h: 18, id: '3b18ec5a-77bd-4e6c-84c6-c6c72c09cfb1' },
    { x: 25, y: 0, w: 21, h: 10, id: '77c31f20-6de7-47a0-878e-9133bdc9414d' },
    { w: 13, h: 8, x: 46, y: 0, id: 'f4435c1e-a921-4012-b341-4dd8687ae340' },
  ],
  xxl: [
    { x: 6, y: 0, w: 19, h: 18, id: '3b18ec5a-77bd-4e6c-84c6-c6c72c09cfb1' },
    { x: 25, y: 0, w: 21, h: 10, id: '77c31f20-6de7-47a0-878e-9133bdc9414d' },
    { w: 13, h: 8, x: 46, y: 0, id: 'f4435c1e-a921-4012-b341-4dd8687ae340' },
  ],
};

export const defaultShortCuts = [
  {
    id: '1',
    title: 'Netflix',
    url: 'https://www.netflix.com/browse',
  },
  {
    id: '2',
    title: 'Google',
    url: 'https://www.google.com.tw/',
  },
  {
    id: '3',
    title: 'Youtube',
    url: 'http://www.youtube.com/?hl=zh-TW&gl=TW',
  },
] as const;
