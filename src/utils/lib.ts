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
const ONE_HOUR_IN_SECOND = 3600000;
export function afterOneHour(rawPrevTime: Date | string) {
  const prevTime =
    typeof rawPrevTime === 'string' ? new Date(rawPrevTime) : rawPrevTime;
  const now = new Date();
  return now.getTime() - prevTime.getTime() > ONE_HOUR_IN_SECOND;
}

export function getDomain(url: string) {
  try {
    const domain = new URL(url);
    return domain.hostname;
  } catch {
    return '';
  }
}

export function getValidateURL(url: string) {
  try {
    return new URL(url).href;
  } catch {
    return new URL(`https://${url}`).href;
  }
}
