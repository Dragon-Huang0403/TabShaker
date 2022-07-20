import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import useDeBounce from '../useDebounce';
import {
  getValueInChromeStorage,
  setValueInChromeStorage,
} from './chromeStorage';
import useLocalStorage from './useLocalStorage';

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useChromeStorage<T>(key: string, defaultValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useLocalStorage<T>(key, defaultValue);
  const debouncedValue = useDeBounce(storedValue, 500);
  const isFinishGetValueFromChrome = useRef(false);
  useEffect(() => {
    getValueInChromeStorage(key).then((value: T) => {
      isFinishGetValueFromChrome.current = true;
      if (value) {
        setStoredValue(value);
      }
    });
  }, [key]);

  const setValue: SetValue<T> = (value) => {
    const newValue = value instanceof Function ? value(storedValue) : value;
    setStoredValue(newValue);
  };

  useEffect(() => {
    if (isFinishGetValueFromChrome.current) {
      setValueInChromeStorage(key, debouncedValue);
    }
  }, [key, debouncedValue]);

  return [storedValue, setValue];
}

export default useChromeStorage;
