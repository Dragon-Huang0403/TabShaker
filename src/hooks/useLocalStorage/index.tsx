import useLocalStorage from './useLocalStorage';
import useChromeStorage from './useChromeStorage';

export default chrome?.storage ? useChromeStorage : useLocalStorage;
