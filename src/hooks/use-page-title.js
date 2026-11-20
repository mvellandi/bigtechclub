import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Big Tech Club` : 'Big Tech Club';
  }, [title]);
}
