import { AlertCircle, ArrowLeft, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function PageIntro({ eyebrow, title, intro, children, className = '' }) {
  return (
    <header className={`page-heading ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {intro && <p className="intro">{intro}</p>}
      {children}
    </header>
  );
}

export function BackLink({ to, children }) {
  return <Link className="back-link" to={to}><ArrowLeft aria-hidden="true" />{children}</Link>;
}

export function LoadingGrid({ count = 3, label = 'Loading content' }) {
  return (
    <div className="loading-grid" role="status" aria-label={label}>
      {Array.from({ length: count }, (_, index) => <Skeleton key={index} className="h-52" />)}
    </div>
  );
}

export function ErrorState({ retry }) {
  return (
    <div className="error-state" role="alert">
      <div className="cluster"><AlertCircle aria-hidden="true" /><strong>The content could not be loaded.</strong></div>
      <p>Check the connection and try the request again.</p>
      <Button variant="outline" onClick={retry}>Try again</Button>
    </div>
  );
}

export function EmptyState({ title = 'No results', children, action }) {
  return (
    <div className="empty-state">
      <SearchX aria-hidden="true" />
      <h2>{title}</h2>
      <p>{children}</p>
      {action}
    </div>
  );
}
