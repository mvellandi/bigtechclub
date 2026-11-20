import type { VariantDefinition } from '../../variant';
import { readingRoomRoutes } from './routes';

export const readingRoomVariant = {
  id: 'reading-room',
  name: 'Reading Room',
  routes: readingRoomRoutes,
  previews: [
    { label: 'Table of contents', path: readingRoomRoutes.home },
    { label: 'Chapter 1 · Frame the problem', path: '/book/frame' },
  ],
  load: () => import('./App'),
} satisfies VariantDefinition;
