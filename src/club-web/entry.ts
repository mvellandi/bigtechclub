import { defaultVariant } from './default';
import { mount } from './mount';

async function start() {
  const load = import.meta.env.DEV
    ? (await import('./variants.dev')).developmentVariant()
    : defaultVariant.load;
  const { default: App } = await load();
  mount(App);
}

void start();
