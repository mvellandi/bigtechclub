import { defaultVariant } from './default';
import { clubRoutes } from './routes';
import { readingRoomRoutes } from './variants/reading-room/routes';

export const variants = [
  { ...defaultVariant, name: 'Pocket Atlas', routes: clubRoutes },
  { id: 'field-quest', name: 'Field Quest', routes: clubRoutes, load: () => import('./variants/field-quest/App') },
  {
    id: 'reading-room',
    name: 'Reading Room',
    routes: readingRoomRoutes,
    previews: [
      { label: 'Table of contents', path: readingRoomRoutes.home },
      { label: 'Chapter 1 · Frame the problem', path: '/book/frame' },
    ],
    load: () => import('./variants/reading-room/App'),
  },
];

export function developmentVariant() {
  const id = new URLSearchParams(window.location.search).get('variant') || defaultVariant.id;
  const active = variants.find(variant => variant.id === id);
  if (active) return active;
  console.warn(`Unknown club-web variant "${id}". Using ${defaultVariant.id}.`);
  return variants[0];
}
