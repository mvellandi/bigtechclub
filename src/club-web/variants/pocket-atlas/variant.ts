import { directoryPreviews } from '../../directory-previews';
import { clubRoutes } from '../../routes';
import type { VariantDefinition } from '../../variant';
import { pocketAtlasRuntime } from './runtime';

export const pocketAtlasVariant = {
  ...pocketAtlasRuntime,
  name: 'Pocket Atlas',
  routes: clubRoutes,
  previews: [
    { label: 'Home', path: clubRoutes.home },
    ...directoryPreviews(clubRoutes.members),
  ],
} satisfies VariantDefinition;
