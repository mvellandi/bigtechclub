import { createRoot } from 'react-dom/client';
import { defaultVariant } from './default';

async function start() {
  const active = import.meta.env.DEV
    ? (await import('./variants.dev')).developmentVariant()
    : defaultVariant;
  const [{ default: ProfilePage }, profile] = await Promise.all([
    active.load(),
    active.source.getProfile(),
  ]);

  createRoot(document.getElementById('root')!).render(<ProfilePage profile={profile} />);
}

void start();
