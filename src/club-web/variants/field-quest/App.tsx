import { ArrowUpRight, BookOpen, Flag, Users } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { usePageTitle } from '@/hooks/use-page-title';
import { ClubLayout } from '../../club-layout';
import './field-quest.css';

function Header() {
  return (
    <header className="quest-header">
      <Link className="quest-brand" to="/"><Flag aria-hidden="true" />Field Quest</Link>
      <nav aria-label="Main navigation">
        <NavLink to="/book">Book</NavLink>
        <NavLink to="/members">Members</NavLink>
        <NavLink to="/live">Live</NavLink>
        <NavLink to="/mission">Mission</NavLink>
      </nav>
      <ThemeSwitcher />
    </header>
  );
}

function Home() {
  usePageTitle('Field Quest');
  return (
    <section className="quest-home">
      <h1>AI engineering<br />in the field.</h1>
      <p className="intro">Follow a help-center assistant from its first design to release. Meet the people working on problems like yours.</p>
      <div className="quest-trails">
        <Link to="/book">
          <BookOpen aria-hidden="true" />
          <strong>Read the book</strong>
          <span>The free AI Engineering Atlas</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
        <Link to="/members">
          <Users aria-hidden="true" />
          <strong>Find members</strong>
          <span>Browse by specialty, interest, or location</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default function FieldQuest() {
  return (
    <div className="field-quest">
      <ClubLayout header={<Header />} home={<Home />} />
    </div>
  );
}
