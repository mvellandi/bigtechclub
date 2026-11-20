import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AtlasMap } from '@/components/atlas-map';
import { ChapterQuiz } from '@/components/chapter-quiz';
import { BackLink, EmptyState, ErrorState, LoadingGrid, PageIntro } from '@/components/page';
import { Button } from '@/components/ui/button';
import { dataSource } from '@/data/data-source';
import { useData } from '@/hooks/use-data';
import { usePageTitle } from '@/hooks/use-page-title';

export function ChapterPage() {
  const { slug } = useParams();
  const location = useLocation();
  const { status, data: book, retry } = useData(dataSource.getBook);
  const chapter = book?.chapters.find((entry) => entry.slug === slug);
  usePageTitle(chapter?.title || 'Chapter');

  useEffect(() => {
    const id = new URLSearchParams(location.search).get('section');
    if (!id || !chapter) return;
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView();
      target?.focus({ preventScroll: true });
    });
  }, [location.search, chapter]);

  if (status === 'loading') return <LoadingGrid label="Loading chapter" />;
  if (status === 'error') return <ErrorState retry={retry} />;
  if (!chapter) return <EmptyState title="Chapter not found">This region is not in the atlas.<Button asChild variant="outline"><Link to="/book">Open the book</Link></Button></EmptyState>;

  const index = book.chapters.indexOf(chapter);
  const next = book.chapters[index + 1];

  return (
    <>
      <BackLink to="/book/landscape">The landscape</BackLink>
      <div className="chapter-header"><PageIntro eyebrow={`Chapter ${index + 1} / ${book.chapters.length} · ${chapter.region}`} title={chapter.title} intro={chapter.summary} /></div>
      <div className="atlas-frame"><AtlasMap chapters={book.chapters} activeChapter={chapter} /><div className="atlas-meta"><strong>{chapter.region}</strong><span>Region {String(index + 1).padStart(2, '0')}</span></div></div>
      <div className="chapter-layout">
        <nav className="chapter-toc" aria-label="Chapter sections">
          <p className="eyebrow">In this chapter</p>
          {chapter.sections.map((section, sectionIndex) => <Link key={section.heading} to={`${location.pathname}?section=part-${sectionIndex}`}>{section.heading}</Link>)}
          <Link to={`${location.pathname}?section=quiz-heading`}>Knowledge check</Link>
        </nav>
        <article>
          {chapter.sections.map((section, sectionIndex) => (
            <section className="reading-section" key={section.heading}>
              <h2 id={`part-${sectionIndex}`} tabIndex={-1}>{section.heading}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <ol className="steps" aria-label="Chapter workflow">{chapter.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <aside className="callout"><strong>Field note</strong><p>{chapter.callout}</p></aside>
          <section className="reading-section rule">
            <p className="eyebrow">Pause and reflect</p>
            <h2 id="quiz-heading" tabIndex={-1}>Check your understanding</h2>
            <p className="fine">{questionsLabel(chapter.quiz.length)} with feedback. Your progress stays on this device while the page is open.</p>
            <ChapterQuiz key={chapter.slug} chapter={chapter} />
          </section>
          <div className="actions">
            <Button asChild variant="outline"><Link to={next ? `/book/${next.slug}` : '/book/landscape'}>{next ? `Next · ${next.title}` : 'Return to the landscape'}<ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </article>
      </div>
    </>
  );
}

function questionsLabel(count) {
  return `${count} ${count === 1 ? 'question' : 'questions'}`;
}
