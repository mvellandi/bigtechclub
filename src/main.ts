if (import.meta.env.DEV) {
  void import('./workspace/launcher');
} else {
  void import('./club-web/entry');
}
