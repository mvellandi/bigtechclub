import { defaultVariant } from './default';
import type { VariantDefinition } from './variant';
import { fieldQuestVariant } from './variants/field-quest/variant';
import { pocketAtlasVariant } from './variants/pocket-atlas/variant';
import { readingRoomVariant } from './variants/reading-room/variant';

export const variants: VariantDefinition[] = [
  pocketAtlasVariant,
  fieldQuestVariant,
  readingRoomVariant,
];

export function developmentVariant() {
  const id = new URLSearchParams(window.location.search).get('variant') || defaultVariant.id;
  const active = variants.find(variant => variant.id === id);
  if (active) return active;
  console.warn(`Unknown club-web variant "${id}". Using ${defaultVariant.id}.`);
  return variants[0];
}
