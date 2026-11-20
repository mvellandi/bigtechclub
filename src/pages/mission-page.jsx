import { ArrowRight, BookOpen, Radio, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageIntro } from '@/components/page';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/use-page-title';

const principles = [
  { icon: BookOpen, title: 'Keep the book public', text: 'The book is free to read online. The proposed $20 print edition sends all proceeds after expenses to a digital literacy charity.', action: 'Read the book', to: '/book' },
  { icon: Users, title: 'Make people easy to find', text: 'Browse by location, specialty, and interest. Each member chooses what to share and where to send a reader next.', action: 'Find members', to: '/members' },
  { icon: Radio, title: 'Give good ideas airtime', text: 'Pitch a timed walkthrough, join a short interview, or bring a perspective to a topic the show is already covering.', action: 'Contribute to a session', to: '/live/apply' }
];

export function MissionPage() {
  usePageTitle('The mission');
  return (
    <div className="narrow">
      <PageIntro eyebrow="An independent public club" title="Learn in the open. Help others find their way." intro="Big Tech Club makes AI engineering education available to anyone and gives practitioners a place to find each other and share what they learn." />
      {principles.map(({ icon: Icon, title, text, action, to }) => (
        <section className="section rule" key={title}>
          <Icon aria-hidden="true" />
          <h2>{title}</h2>
          <p className="intro">{text}</p>
          <div className="actions"><Button asChild variant="outline"><Link to={to}>{action}<ArrowRight aria-hidden="true" /></Link></Button></div>
        </section>
      ))}
    </div>
  );
}
