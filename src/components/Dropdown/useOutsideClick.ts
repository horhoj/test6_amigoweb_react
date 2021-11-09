import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useOutsideClick = (ref: any, callback: () => void) => {
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      callback();
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
};
