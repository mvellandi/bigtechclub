import { useEffect, useState } from 'react';

type DataState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: unknown };

export function useData<T>(
  loader: (options: { signal: AbortSignal }) => Promise<T>,
  dependencies: readonly unknown[] = [],
) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<DataState<T>>({ status: 'loading', data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading', data: null, error: null });
    loader({ signal: controller.signal })
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((error: unknown) => {
        if (!(error instanceof Error && error.name === 'AbortError')) {
          setState({ status: 'error', data: null, error });
        }
      });
    return () => controller.abort();
  }, [attempt, ...dependencies]);

  return { ...state, retry: () => setAttempt((value) => value + 1) };
}
