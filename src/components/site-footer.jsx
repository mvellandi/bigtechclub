import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <Link className="brand" to="/">
            <span className="brand-mark"><Compass aria-hidden="true" /></span>
            <span>Big Tech Club</span>
          </Link>
          <p>An independent club for AI engineering education. This prototype uses fictional member profiles and events.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/book/print">Print edition</Link>
          <Link to="/live/apply">Contribute</Link>
          <Link to="/mission">Our mission</Link>
        </nav>
      </div>
    </footer>
  );
}
