import { BookOpen, Clock3, Map, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AtlasMap } from '@/components/atlas-map';
import { ChapterList } from '@/components/content';
import { ErrorState, LoadingGrid, PageIntro } from '@/components/page';
import { Button } from '@/components/ui/button';
import { dataSource } from '@/data/data-source';
import { useData } from '@/hooks/use-data';
import { usePageTitle } from '@/hooks/use-page-title';

export function BookPage() {
  usePageTitle('AI Engineering Atlas');
  const { status, data: book, retry } = useData(dataSource.getBook);

  if (status === 'loading') return <LoadingGrid label="Loading the book" />;
  if (status === 'error') return <ErrorState retry={retry} />;

  return (
    <>
      <section className="book-hero">
        <div>
          <PageIntro eyebrow="The Big Tech Club field guide" title={book.title} intro={book.description}>
            <div className="book-facts">
              <span><BookOpen aria-hidden="true" />Five chapters</span>
              <span><Clock3 aria-hidden="true" />Read at your pace</span>
              <span><Map aria-hidden="true" />One shared map</span>
            </div>
            <div className="actions">
              <Button asChild size="lg"><Link to={`/book/${book.chapters[0].slug}`}>Start chapter one</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/book/landscape">Open the landscape</Link></Button>
            </div>
          </PageIntro>
        </div>
        <div className="book-cover" role="img" aria-label="Cover of AI Engineering Atlas">
          <div className="book-cover-top"><span>Big Tech Club</span><span>Field guide · 01</span></div>
          <div className="book-cover-title">AI Engineering<br />Atlas</div>
          <AtlasMap chapters={book.chapters} cover />
        </div>
      </section>
      <section className="section narrow rule">
        <div className="section-heading"><div><p className="eyebrow">Your route</p><h2>Contents</h2></div><Button asChild variant="outline" size="sm"><Link to="/book/print"><ShoppingBag aria-hidden="true" />$20 print edition</Link></Button></div>
        <ChapterList chapters={book.chapters} />
      </section>
    </>
  );
}
