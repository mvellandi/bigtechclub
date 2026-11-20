import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '@/hooks/use-page-title';

export function NotFoundPage() {
  usePageTitle('Page not found · Reading Room');
  return (
    <section className="rr-message">
      <p className="rr-overline">Reading Room</p>
      <h1>Page not found</h1>
      <p>Reading Room contains only the AI Engineering Atlas.</p>
      <Link className="rr-text-link" to="/">Open table of contents<ArrowRight aria-hidden="true" /></Link>
    </section>
  );
}
