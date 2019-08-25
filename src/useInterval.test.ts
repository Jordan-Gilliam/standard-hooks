import { renderHook } from '@testing-library/react-hooks';
import { useInterval } from '.';

// Source: https://github.com/donavon/use-interval/blob/master/__tests__/index.test.js

jest.useFakeTimers();

test('calls event handler each second', () => {
  const handler = jest.fn();

  renderHook(() => useInterval(handler, 1000));
  expect(handler).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(5000);
  expect(handler).toHaveBeenCalledTimes(5);
});

test('pausing the timer', () => {
  const handler = jest.fn();

  renderHook(() => useInterval(handler, null));

  jest.advanceTimersToNextTimer();
  expect(handler).toHaveBeenCalledTimes(0);
});

test('passing a new handler does not restart the timer', () => {
  const handler1 = jest.fn();
  const handler2 = jest.fn();
  let handler = handler1;

  const { rerender } = renderHook(() => useInterval(handler, 1000));
  jest.advanceTimersByTime(500);

  handler = handler2;
  rerender();

  jest.advanceTimersByTime(500);
  expect(handler1).toHaveBeenCalledTimes(0);
  expect(handler2).toHaveBeenCalledTimes(1);
});

test('passing a new delay cancels the timer and starts a new one', () => {
  const handler = jest.fn();
  let delay = 500;

  const { rerender } = renderHook(() => useInterval(handler, delay));
  jest.advanceTimersByTime(1000);
  expect(handler).toHaveBeenCalledTimes(2);

  delay = 1000;
  rerender();

  jest.advanceTimersByTime(5000);
  expect(handler).toHaveBeenCalledTimes(7);
});

test('passing the same parameters causes no change in the timer', () => {
  const handler = jest.fn();

  const { rerender } = renderHook(() => useInterval(handler, 1000));
  jest.advanceTimersByTime(500);

  rerender();

  jest.advanceTimersByTime(500);
  expect(handler).toHaveBeenCalledTimes(1);
});
