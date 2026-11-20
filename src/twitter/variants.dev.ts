import { defaultVariant } from './default';
import type { VariantDefinition } from './variant';
import { liveDeskVariant } from './variants/live-desk/variant';

export const variants: VariantDefinition[] = [
  defaultVariant,
  liveDeskVariant,
];

export function developmentVariant() {
  const id = new URLSearchParams(window.location.search).get('variant') || defaultVariant.id;
  const active = variants.find(variant => variant.id === id);
  if (active) return active;
  console.warn(`Unknown Twitter variant "${id}". Using ${defaultVariant.id}.`);
  return defaultVariant;
}
