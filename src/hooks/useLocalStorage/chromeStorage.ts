const QUOTA_BYTES_PER_ITEM = 4000;

export function getValueInChromeStorage(key: string): any {
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (items) => {
      const itemKeys = Object.keys(items)
        .filter((itemKey) => itemKey.includes(key))
        .sort((a, b) => {
          if (a.charAt(-1) < b.charAt(-1)) {
            return -1;
          }
          return 1;
        });
      if (itemKeys.length === 0) {
        resolve(null);
        return;
      }
      if (itemKeys.length === 1) {
        resolve(items[itemKeys[0]]);
        return;
      }
      const rawRecoveredValue = itemKeys
        .map((itemKey) => items[itemKey])
        .join('');
      const recoveredValue = JSON.parse(rawRecoveredValue);
      resolve(recoveredValue);
    });
  });
}

export function setValueInChromeStorage<T>(key: string, value: T) {
  const valueInString = JSON.stringify(value);
  const valueInStringLength = valueInString.length;
  const part = Math.ceil(valueInStringLength / QUOTA_BYTES_PER_ITEM);
  chrome.storage.sync.get(null, (items) => {
    const itemKeys = Object.keys(items)
      .filter((itemKey) => itemKey.includes(key))
      .sort((a, b) => {
        if (a.charAt(-1) < b.charAt(-1)) {
          return -1;
        }
        return 1;
      });
    if (itemKeys.length > part) {
      const extraKeys = Array(itemKeys.length - part)
        .fill('')
        .map((_, i) => `${key}${part + i}`);
      chrome.storage.sync.remove(extraKeys);
    }
  });
  if (part === 1) {
    chrome.storage.sync.set({ [`${key}0`]: value });
    return;
  }
  const storedObj: { [key: string]: string } = {};
  Array(part)
    .fill('')
    .forEach((_, index) => {
      storedObj[`${key}${index}`] = valueInString.slice(
        index * QUOTA_BYTES_PER_ITEM,
        (index + 1) * QUOTA_BYTES_PER_ITEM,
      );
    });

  Object.keys(storedObj).forEach((objKey) => {
    chrome.storage.sync.set({ [objKey]: storedObj[objKey] });
  });
}
