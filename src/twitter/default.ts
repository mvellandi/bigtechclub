import { profileSource } from './data-source';
import type { VariantDefinition } from './variant';

export const defaultVariant = {
  id: 'profile',
  name: 'Profile',
  source: profileSource,
  previews: [
    { label: 'With posts' },
    { label: 'No posts', scenario: 'empty-profile' },
  ],
  load: () => import('./profile'),
} satisfies VariantDefinition;
