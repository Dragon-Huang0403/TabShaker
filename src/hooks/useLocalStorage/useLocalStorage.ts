import { useState, Dispatch, SetStateAction } from 'react';

function getInitialValue<T>(key: string, defaultValue: T) {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, defaultValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getInitialValue(key, defaultValue),
  );

  const setValue: SetValue<T> = (value) => {
    const newValue = value instanceof Function ? value(storedValue) : value;
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
