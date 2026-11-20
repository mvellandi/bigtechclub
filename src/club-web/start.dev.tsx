import { mount } from './mount';
import { VariantSwitcher } from './switcher.dev';
import { developmentVariant } from './variants.dev';

export async function startDevelopment() {
  const active = developmentVariant();
  const { default: App } = await active.load();
  mount(() => (
    <>
      <App />
      <VariantSwitcher active={active} />
    </>
  ));
}
