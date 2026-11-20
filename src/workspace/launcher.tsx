import { createRoot } from 'react-dom/client';
import { ArrowUpRight, BookOpen, MessageCircle } from 'lucide-react';
import './launcher.css';

document.title = 'Workspace · Big Tech Club';

const experiences = [
  { href: './club-web/', title: 'Club Web', description: 'Explore the book and member directory.', Icon: BookOpen },
  { href: './twitter/', title: 'Twitter profile', description: 'Preview the club’s social feed.', Icon: MessageCircle },
];

function Launcher() {
  return (
    <main className="workspace">
      <header>Big Tech Club</header>
      <h1>UX workspace</h1>
      <nav aria-label="Experiences">
        {experiences.map(({ href, title, description, Icon }) => (
          <a href={href} key={href}>
            <Icon aria-hidden="true" />
            <div><strong>{title}</strong><p>{description}</p></div>
            <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </nav>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<Launcher />);
