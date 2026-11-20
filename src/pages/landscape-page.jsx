import { AtlasMap } from '@/components/atlas-map';
import { ChapterList } from '@/components/content';
import { BackLink, ErrorState, LoadingGrid, PageIntro } from '@/components/page';
import { dataSource } from '@/data/data-source';
import { useData } from '@/hooks/use-data';
import { usePageTitle } from '@/hooks/use-page-title';

export function LandscapePage() {
  usePageTitle('The landscape');
  const { status, data: book, retry } = useData(dataSource.getBook);

  if (status === 'loading') return <LoadingGrid label="Loading the atlas" />;
  if (status === 'error') return <ErrorState retry={retry} />;

  return (
    <>
      <BackLink to="/book">AI Engineering Atlas</BackLink>
      <PageIntro eyebrow="A visual table of contents" title="The landscape" intro="Choose any region to open its chapter. Or follow the route from the Survey Coast to the Watchtower." />
      <section className="section atlas-frame"><AtlasMap chapters={book.chapters} interactive /><div className="atlas-meta"><strong>Choose a landmark to begin</strong><span>Five chapter regions</span></div></section>
      <section className="section narrow"><ChapterList chapters={book.chapters} /></section>
    </>
  );
}
