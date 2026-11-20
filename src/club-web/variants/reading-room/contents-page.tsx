import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '@/hooks/use-page-title';
import { BookError, BookLoading } from './states';
import { useBook } from './use-book';

export function ContentsPage() {
  usePageTitle('AI Engineering Atlas · Reading Room');
  const { status, book, retry } = useBook();

  if (status === 'loading') return <BookLoading label="Opening the table of contents" />;
  if (status === 'error' || !book) return <BookError retry={retry} />;

  return (
    <>
      <section className="rr-contents-hero" aria-labelledby="rr-book-title">
        <div className="rr-edition"><span>Big Tech Club</span><span>Open edition · 01</span></div>
        <div className="rr-title-block">
          <p className="rr-overline">A book about building useful AI systems</p>
          <h1 id="rr-book-title">{book.title}</h1>
          <p className="rr-subtitle">{book.subtitle}</p>
        </div>
        <div className="rr-book-intro">
          <p>{book.description}</p>
          <Link className="rr-start" to={`/book/${book.chapters[0].slug}`}>
            Begin with chapter one<ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="rr-contents" aria-labelledby="rr-contents-title">
        <div className="rr-section-heading">
          <h2 id="rr-contents-title">Table of contents</h2>
          <p>{book.chapters.length} chapters · Read at your own pace</p>
        </div>
        <ol>
          {book.chapters.map((chapter, index) => (
            <li key={chapter.slug}>
              <Link to={`/book/${chapter.slug}`}>
                <span className="rr-chapter-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="rr-chapter-description">
                  <strong>{chapter.title}</strong>
                  <span>{chapter.summary}</span>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
