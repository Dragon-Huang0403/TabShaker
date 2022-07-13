import type { WidgetData, WidgetType } from '../types/WidgetTypes';

export function getAudioUrl(word: string) {
  const str = word.toLocaleLowerCase();
  let url = `https://www.oxfordlearnersdictionaries.com/media/english/us_pron/${str.charAt(
    0,
  )}/${str.slice(0, 3)}/`;
  if (str.length >= 5) {
    url += `${str.slice(0, 5)}/${str}__us_1.mp3`;
    return url;
  }
  url += `${str.padEnd(5, '_')}/${str}__us_1.mp3`;
  return url;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getAvailableWidgetTypes(
  currentWidgets: WidgetData[],
  widgetConfig: { [key in WidgetType]: { maxQuantity: number } },
) {
  const currentWidgetTypeCount: { [key in WidgetType]?: number } = {};
  currentWidgets.forEach((widget) => {
    const { type } = widget;
    if (!currentWidgetTypeCount[type]) {
      currentWidgetTypeCount[type] = 1;
      return;
    }
    currentWidgetTypeCount[type]! += 1;
  });
  const availableWidgetTypes = (
    Object.keys(widgetConfig) as WidgetType[]
  ).filter((widgetType) => {
    if (!currentWidgetTypeCount[widgetType]) return true;
    if (
      currentWidgetTypeCount[widgetType]! < widgetConfig[widgetType].maxQuantity
    )
      return true;
    return false;
  });

  return availableWidgetTypes;
}
