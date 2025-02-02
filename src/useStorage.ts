import { useReducer } from 'react';
import { JSONValue } from './types';
import { getLazyValue } from './utils';

export function canAccessStorage(getStorage: () => Storage) {
  try {
    // Check if the storage object is defined and available
    // Prior to Firefox 70, localStorage may be null
    if (getStorage()) return true;
    // eslint-disable-next-line no-empty
  } catch {}
  return false;
}

export default function useStorage<T extends JSONValue>(
  storage: Storage,
  key: string,
  initialValue: T | (() => T) | null = null,
  errorCallback?: (error: DOMException | TypeError) => void,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  return useReducer(
    (prevValue: T, update: React.SetStateAction<T>) => {
      const nextValue =
        typeof update === 'function' ? update(prevValue) : update;

      try {
        storage.setItem(key, JSON.stringify(nextValue));
      } catch (error) {
        if (errorCallback) errorCallback(error);
      }
      return nextValue;
    },

    key,
    initialKey => {
      const serializedValue = storage.getItem(initialKey);

      if (serializedValue != null) {
        try {
          return JSON.parse(serializedValue);
        } catch {
          // Backwards compatibility with past stored non-serialized values
          return serializedValue;
        }
      }

      return getLazyValue(initialValue);
    },
  );
}
