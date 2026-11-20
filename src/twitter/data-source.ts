import profile from './profile.json' with { type: 'json' };

export interface LiveSession {
  topic: string;
  state: 'in-progress' | 'recap';
  label: string;
  summary: string;
}

export interface Profile {
  name: string;
  handle: string;
  bio: string;
  followers: number;
  session?: LiveSession;
  posts: {
    id: string;
    date: string;
    text: string;
    link: string;
    label: string;
    likes: number;
    pinned: boolean;
  }[];
}

export interface ProfileDataSource {
  getProfile: () => Promise<Profile>;
}

export const emptyProfileScenario = 'empty-profile';

export const profileSource: ProfileDataSource = {
  async getProfile() {
    if (import.meta.env.DEV) {
      const scenario = new URLSearchParams(window.location.search).get('scenario');
      if (scenario === emptyProfileScenario) return { ...profile, posts: [] };
    }
    return profile;
  },
};
