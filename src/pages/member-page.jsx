import { ArrowUpRight, BookOpen, MapPin, Users } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BackLink, EmptyState, ErrorState, LoadingGrid, PageIntro } from '@/components/page';
import { Button } from '@/components/ui/button';
import { dataSource } from '@/data/data-source';
import { useData } from '@/hooks/use-data';
import { usePageTitle } from '@/hooks/use-page-title';

const readingBySpecialty = {
  Evaluation: 'evaluate',
  Retrieval: 'ground',
  Operations: 'operate',
  Workflow: 'workflow'
};

export function MemberPage() {
  const { slug } = useParams();
  const location = useLocation();
  const { status, data: member, retry } = useData(({ signal }) => dataSource.getMember(slug, { signal }), [slug]);
  usePageTitle(member?.name || 'Member profile');

  if (status === 'loading') return <LoadingGrid label="Loading member profile" />;
  if (status === 'error') return <ErrorState retry={retry} />;
  if (!member) return <EmptyState title="Member not found">This profile is not in the prototype directory.<Button asChild variant="outline"><Link to="/members">Browse members</Link></Button></EmptyState>;

  const reading = readingBySpecialty[member.specialty];
  return (
    <div className="narrow">
      <BackLink to={`/members${location.search}`}>Member directory</BackLink>
      <section className="profile">
        <div>
          <PageIntro eyebrow={`${member.city} · ${member.region}`} title={member.name} intro={member.focus} />
          <dl className="profile-details">
            <div><dt>Ask me about</dt><dd>{member.specialty}</dd></div>
            <div><dt>Exploring now</dt><dd>{member.exploring}</dd></div>
            <div><dt>Club interest</dt><dd>{member.interest}</dd></div>
          </dl>
        </div>
        <span className="avatar" aria-hidden="true">{member.initials}</span>
      </section>
      <section className="section rule">
        <p className="eyebrow">Selected by {member.name.split(' ')[0]}</p>
        <h2>Useful places to go next</h2>
        <div className="link-list">
          {member.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer"><span>{link.label} · example</span><ArrowUpRight aria-hidden="true" /></a>)}
          <Link to={`/book/${reading}`}><span className="cluster"><BookOpen aria-hidden="true" />Recommended chapter</span><ArrowUpRight aria-hidden="true" /></Link>
          <Link to={`/members?place=${encodeURIComponent(member.city)}`}><span className="cluster"><Users aria-hidden="true" />More members in {member.city}</span><ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>
      <p className="fine section"><MapPin aria-hidden="true" /> Member locations are approximate. Members choose which links to publish.</p>
    </div>
  );
}
