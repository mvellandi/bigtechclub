import { ArrowRight, BookOpen, CalendarDays, HeartHandshake, Radio, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AtlasMap } from '@/components/atlas-map';
import { ChapterList, MemberCard } from '@/components/content';
import { ErrorState, LoadingGrid } from '@/components/page';
import { Button } from '@/components/ui/button';
import { dataSource } from '@/data/data-source';
import { useData } from '@/hooks/use-data';
import { usePageTitle } from '@/hooks/use-page-title';

export function HomePage() {
  usePageTitle();
  const { status, data, retry } = useData(dataSource.getHome);

  if (status === 'loading') return <LoadingGrid label="Loading the club overview" />;
  if (status === 'error') return <ErrorState retry={retry} />;

  const { book, members, program } = data;
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">An open field guide to AI engineering</p>
          <h1>Find your way.<br /><span className="accent-word">Build with care.</span></h1>
          <p className="intro">Read a free book about making useful AI systems. Meet people who share your questions. Learn in the open, one well-marked trail at a time.</p>
          <div className="actions">
            <Button asChild size="lg"><Link to="/book"><BookOpen aria-hidden="true" />Read the book</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/members"><Users aria-hidden="true" />Find members</Link></Button>
          </div>
          <p className="hero-note"><HeartHandshake aria-hidden="true" />Independent, public, and free to explore.</p>
        </div>
        <div className="hero-visual atlas-frame">
          <AtlasMap chapters={book.chapters} interactive />
          <div className="atlas-meta"><strong>The AI Engineering Atlas</strong><span>Vol. 01 · Five regions</span></div>
        </div>
      </section>

      <section className="section split-feature rule">
        <div>
          <p className="eyebrow">The book</p>
          <h2>A shared map for unfamiliar terrain.</h2>
          <p>Follow a support team as it turns an idea into a service. Each chapter gives you a practical outcome, a field note, and a short knowledge check.</p>
          <div className="actions"><Button asChild variant="outline"><Link to="/book/landscape">Explore the landscape<ArrowRight aria-hidden="true" /></Link></Button></div>
        </div>
        <ChapterList chapters={book.chapters} />
      </section>

      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">The directory</p><h2>Meet your fellow travelers.</h2></div>
          <Link to="/members">Browse all members<ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="member-grid">{members.map((member) => <MemberCard key={member.slug} member={member} />)}</div>
      </section>

      <section className="section broadcast">
        <div>
          <p className="eyebrow"><Radio aria-hidden="true" /> On the livestream</p>
          <h2>{program.upcoming.title}</h2>
          <p className="intro">{program.upcoming.description}</p>
          <div className="actions"><Button asChild variant="outline"><Link to="/live">See the session<ArrowRight aria-hidden="true" /></Link></Button></div>
        </div>
        <div className="broadcast-time"><CalendarDays aria-hidden="true" /><div><strong>{program.upcoming.date}</strong><p>{program.upcoming.duration}<br />Online · Free to attend</p></div></div>
      </section>

      <section className="section mission-strip rule">
        <HeartHandshake aria-hidden="true" />
        <div><h3>Make AI engineering easier to learn.</h3><p>Keep the book open to everyone and send print proceeds after expenses to a digital literacy charity.</p></div>
        <Button asChild variant="ghost"><Link to="/mission">About the club<ArrowRight aria-hidden="true" /></Link></Button>
      </section>
    </>
  );
}
