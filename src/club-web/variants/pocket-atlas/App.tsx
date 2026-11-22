import { SiteHeader } from '@/components/site-header';
import { ClubLayout } from '../../club-layout';
import { HomePage } from './home-page';

export default function PocketAtlas() {
  return <ClubLayout header={<SiteHeader />} home={<HomePage />} />;
}
