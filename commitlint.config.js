module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'GridLayout',
        'NavBar',
        'Note',
        'Todo',
        'Clock',
        'EngCard',
        'News',
        'Weather',
      ],
    ],
  },
};
