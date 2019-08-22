import { useCallback, useEffect, useRef } from 'react';

export type EventArgs<T> = Omit<T, keyof Event>;

export const canUseDOM = typeof window !== 'undefined';

export function managedEventListener<T extends Event>(
  target: EventTarget,
  type: string,
  callback: (event: T) => void,
  options?: AddEventListenerOptions,
) {
  target.addEventListener(
    type,
    (callback as unknown) as EventListener,
    options,
  );
  return () => {
    target.removeEventListener(
      type,
      (callback as unknown) as EventListener,
      options,
    );
  };
}

export function managedInterval(callback: () => void, delayMs: number) {
  const id = setInterval(callback, delayMs);
  return () => {
    clearInterval(id);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEventCallback<T extends (...args: any[]) => any>(
  callback: T,
) {
  // Source: https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useCallback((...args) => ref.current!(...args) as T, [ref]);
}
