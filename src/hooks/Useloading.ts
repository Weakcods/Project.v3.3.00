import { useState, useCallback } from 'react';

export function useLoading(delay = 500) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const withLoading = useCallback(async (fn: () => Promise<any>) => {
    try {
      startLoading();
      await fn();
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading
  };
}