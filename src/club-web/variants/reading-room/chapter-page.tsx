import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ChapterQuiz } from '@/components/chapter-quiz';
import { usePageTitle } from '@/hooks/use-page-title';
import { BookError, BookLoading } from './states';
import { useBook } from './use-book';

export function ChapterPage() {
  const { slug } = useParams();
  const { status, book, retry } = useBook();
  const chapter = book?.chapters.find((entry) => entry.slug === slug);
  usePageTitle(chapter ? `${chapter.title} · Reading Room` : status === 'success' ? 'Chapter not found · Reading Room' : 'Reading Room');

  if (status === 'loading') return <BookLoading label="Opening the chapter" />;
  if (status === 'error' || !book) return <BookError retry={retry} />;
  if (!chapter) {
    return (
      <section className="rr-message">
        <p className="rr-overline">AI Engineering Atlas</p>
        <h1>Chapter not found</h1>
        <p>This address does not match a chapter in the book.</p>
        <Link className="rr-text-link" to="/">Return to table of contents<ArrowRight aria-hidden="true" /></Link>
      </section>
    );
  }

  const index = book.chapters.indexOf(chapter);
  const previous = book.chapters[index - 1];
  const next = book.chapters[index + 1];

  return (
    <>
      <Link className="rr-back-link" to="/"><ArrowLeft aria-hidden="true" />Table of contents</Link>
      <header className="rr-chapter-header">
        <div className="rr-chapter-meta">
          <p>{book.title}</p>
          <p>Chapter {index + 1} of {book.chapters.length}</p>
        </div>
        <h1>{chapter.title}</h1>
        <p className="rr-chapter-summary">{chapter.summary}</p>
      </header>

      <div className="rr-chapter-layout">
        <nav className="rr-book-navigation" aria-label="Book chapters">
          <p>In this book</p>
          <ol>
            {book.chapters.map((entry, chapterIndex) => (
              <li key={entry.slug}>
                <Link to={`/book/${entry.slug}`} aria-current={entry.slug === chapter.slug ? 'page' : undefined}>
                  <span>{String(chapterIndex + 1).padStart(2, '0')}</span>{entry.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="rr-reading-column">
          <article className="rr-article">
            {chapter.sections.map((section, sectionIndex) => (
              <section key={section.heading}>
                <h2><span>{String(sectionIndex + 1).padStart(2, '0')}</span>{section.heading}</h2>
                <p>{section.text}</p>
              </section>
            ))}

            <section className="rr-practice">
              <p className="rr-overline">From reading to practice</p>
              <h2>Put this chapter to work</h2>
              <ol className="rr-steps">
                {chapter.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </section>

            <aside className="rr-field-note">
              <p>Field note</p>
              <blockquote>{chapter.callout}</blockquote>
            </aside>

            <section className="rr-knowledge-check">
              <p className="rr-overline">Pause and reflect</p>
              <h2>Check your understanding</h2>
              <p>{questionsLabel(chapter.quiz.length)} with feedback. Your answers stay in this page view.</p>
              <ChapterQuiz key={chapter.slug} chapter={chapter} />
            </section>
          </article>

          <nav className="rr-pagination" aria-label="Chapter navigation">
            {previous && (
              <Link className="rr-previous" to={`/book/${previous.slug}`} aria-label={`Previous chapter: ${previous.title}`}>
                <ArrowLeft aria-hidden="true" /><span><small>Previous chapter</small><strong>{previous.title}</strong></span>
              </Link>
            )}
            {next && (
              <Link className="rr-next" to={`/book/${next.slug}`} aria-label={`Next chapter: ${next.title}`}>
                <span><small>Next chapter</small><strong>{next.title}</strong></span><ArrowRight aria-hidden="true" />
              </Link>
            )}
          </nav>

          {!next && (
            <section className="rr-end" aria-labelledby="rr-end-title">
              <p className="rr-overline">End of the book</p>
              <h2 id="rr-end-title">You have reached the final page.</h2>
              <p>Return to the table of contents to revisit any chapter.</p>
              <Link className="rr-text-link" to="/">Return to table of contents<ArrowRight aria-hidden="true" /></Link>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

function questionsLabel(count: number) {
  return `${count} ${count === 1 ? 'question' : 'questions'}`;
}
