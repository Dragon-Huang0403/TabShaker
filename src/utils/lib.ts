// eslint-disable-next-line import/no-cycle
import type { WidgetData, WidgetType } from '../types/WidgetTypes';

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
