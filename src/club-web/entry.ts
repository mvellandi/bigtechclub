import { defaultVariant } from './default';
import { mount } from './mount';

async function start() {
  if (import.meta.env.DEV) {
    const { startDevelopment } = await import('./start.dev');
    return startDevelopment();
  }
  const { default: App } = await defaultVariant.load();
  mount(App);
}

void start();
