import { defaultVariant } from './default';

const variants = new Map([
  [defaultVariant.id, defaultVariant.load],
  ['field-quest', () => import('./variants/field-quest/App')],
]);

export function developmentVariant() {
  const id = new URLSearchParams(window.location.search).get('variant');
  if (!id) return defaultVariant.load;
  const load = variants.get(id);
  if (load) return load;
  console.warn(`Unknown club-web variant "${id}". Using ${defaultVariant.id}.`);
  return defaultVariant.load;
}
