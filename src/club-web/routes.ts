// Stable page IDs let the development switcher compare the two route tables.
export const clubRoutes = {
  home: '/',
  book: '/book',
  landscape: '/book/landscape',
  print: '/book/print',
  chapter: '/book/:slug',
  members: '/members',
  member: '/members/:slug',
  live: '/live',
  contribute: '/live/apply',
  mission: '/mission',
} as const;
