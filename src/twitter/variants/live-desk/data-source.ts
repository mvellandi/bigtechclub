import type { Profile, ProfileDataSource } from '../../data-source';
import inProgressFixture from './session-in-progress.json' with { type: 'json' };
import recapFixture from './session-recap.json' with { type: 'json' };

export const sessionInProgressScenario = 'session-in-progress';
export const sessionRecapScenario = 'session-recap';

const inProgressProfile = inProgressFixture as Profile;
const recapProfile = recapFixture as Profile;

export const liveDeskProfileSource: ProfileDataSource = {
  async getProfile() {
    const scenario = new URLSearchParams(window.location.search).get('scenario');
    return scenario === sessionRecapScenario ? recapProfile : inProgressProfile;
  },
};
