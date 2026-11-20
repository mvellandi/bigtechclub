import { directoryPreviews } from '../../directory-previews';
import { clubRoutes } from '../../routes';
import type { VariantDefinition } from '../../variant';

export const fieldQuestVariant = {
  id: 'field-quest',
  name: 'Field Quest',
  routes: clubRoutes,
  previews: [
    { label: 'Home', path: clubRoutes.home },
    ...directoryPreviews(clubRoutes.members),
  ],
  load: () => import('./App'),
} satisfies VariantDefinition;
