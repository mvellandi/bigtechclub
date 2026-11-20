import { BookOpen, HeartHandshake, PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackLink, PageIntro } from '@/components/page';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/use-page-title';

export function PrintPage() {
  usePageTitle('Print edition');
  return (
    <div className="narrow">
      <BackLink to="/book">AI Engineering Atlas</BackLink>
      <PageIntro eyebrow="A copy for your desk" title="The $20 print edition" intro="The complete AI Engineering Atlas, with the full landscape and a regional map at the start of every chapter." />
      <section className="section rule">
        <PackageOpen aria-hidden="true" />
        <h2>What the price supports</h2>
        <p className="intro">The price covers printing and fulfillment first. All proceeds after expenses go to a digital literacy charity. The charity selection and expense policy remain open decisions.</p>
      </section>
      <section className="section rule">
        <HeartHandshake aria-hidden="true" />
        <h2>Reading stays free</h2>
        <p className="intro">The print program has not opened for orders. You can read every chapter online now.</p>
        <div className="actions"><Button asChild><Link to="/book"><BookOpen aria-hidden="true" />Read online for free</Link></Button></div>
      </section>
    </div>
  );
}
