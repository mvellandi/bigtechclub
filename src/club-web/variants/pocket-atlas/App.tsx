import { lazy } from 'react';
import { SiteHeader } from '@/components/site-header';
import { ClubLayout } from '../../club-layout';

const Home = lazy(() => import('./home-page').then(({ HomePage }) => ({ default: HomePage })));

export default function PocketAtlas() {
  return <ClubLayout header={<SiteHeader />} home={<Home />} />;
}
