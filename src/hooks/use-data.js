import { useEffect, useState } from 'react';

export function useData(loader, dependencies = []) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading', data: null, error: null });
    loader({ signal: controller.signal })
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ status: 'error', data: null, error });
        }
      });
    return () => controller.abort();
  }, [attempt, ...dependencies]);

  return { ...state, retry: () => setAttempt((value) => value + 1) };
}
