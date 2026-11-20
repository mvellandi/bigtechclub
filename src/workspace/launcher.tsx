import { createRoot } from 'react-dom/client';
import { experiences } from './experiences.dev';
import './launcher.css';

document.title = 'Workspace · Big Tech Club';

function Launcher() {
  return (
    <main className="workspace">
      <header>Big Tech Club</header>
      <h1>UX workspace</h1>
      <nav aria-label="Experiences">
        {experiences.map(app => (
          <section key={app.href}>
            <h2><a href={app.href}>{app.name}</a></h2>
            <details>
              <summary aria-label={app.name + ' previews'}>Previews</summary>
              {app.previews.map(group => (
                <div className="preview-group" key={group.name}>
                  <h3>{group.name}</h3>
                  <ul>{group.links.map(link => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}</ul>
                </div>
              ))}
            </details>
          </section>
        ))}
      </nav>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<Launcher />);
