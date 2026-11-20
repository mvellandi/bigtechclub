import { useEffect, useRef, type ReactNode } from 'react';
import { BookOpen } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export function ReadingRoomLayout({ children }: { children: ReactNode }) {
  const main = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="reading-room">
      <div className="rr-shell">
        <button className="rr-skip" type="button" onClick={() => main.current?.focus()}>Skip to content</button>
        <header className="rr-header">
          <div className="rr-header-inner">
            <Link className="rr-brand" to="/" aria-label="Reading Room home">
              <BookOpen aria-hidden="true" />
              <span><strong>Reading Room</strong><small>Big Tech Club</small></span>
            </Link>
            <nav aria-label="Reading Room navigation">
              <NavLink to="/" end>Table of contents</NavLink>
            </nav>
          </div>
        </header>
        <main className="rr-main" ref={main} id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="rr-footer">
          <p>AI Engineering Atlas</p>
          <p>A free book from Big Tech Club.</p>
        </footer>
      </div>
    </div>
  );
}
