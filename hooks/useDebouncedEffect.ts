/**
 * Originally written by Todd Skelton
 * https://stackoverflow.com/users/1212994/todd-skelton
 * https://stackoverflow.com/questions/54666401/how-to-use-throttle-or-debounce-with-react-hook/54666498
 */
import { useCallback, useEffect } from 'react';

type CleanUp = TVoid | undefined | void;

type Callback = (...args: any[]) => CleanUp;

export default function useDebouncedEffect(
  effect: Callback,
  deps: any[],
  delay = 666
): void {
  const callback = useCallback(effect, [...deps]); // eslint-disable-line

  useEffect(() => {
    let cleanUp: CleanUp;

    const handler = setTimeout(() => {
      cleanUp = callback();
    }, delay);

    return () => {
      cleanUp?.();

      clearTimeout(handler);
    };
  }, [callback, delay]);
}
