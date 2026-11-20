import profile from './profile.json';

export const profileSource = {
  async getProfile() {
    if (import.meta.env.DEV) {
      const { emptyProfileScenario } = await import('./manifest.dev');
      if (new URLSearchParams(window.location.search).get('scenario') === emptyProfileScenario) {
        return { ...profile, posts: [] };
      }
    }
    return profile;
  },
};
