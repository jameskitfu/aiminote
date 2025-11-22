import { useState, useCallback } from 'react';

export function useAsync<T = unknown>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const run = useCallback(async (fn: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      setData(result);
      return result;
    } catch (e) {
      const msg = e instanceof Error ? e.message : '请求失败';
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, run } as const;
}

