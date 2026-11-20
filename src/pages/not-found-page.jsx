import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/page';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/use-page-title';

export function NotFoundPage() {
  usePageTitle('Page unavailable');
  return <EmptyState title="This trail does not exist">Open the book or browse the member directory to continue.<Button asChild><Link to="/">Go to the homepage</Link></Button></EmptyState>;
}
