import { dataSource } from '@/data/data-source';
import { useData } from '@/hooks/use-data';

export interface Book {
  title: string;
  subtitle: string;
  description: string;
  chapters: BookChapter[];
}

export interface BookChapter {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; text: string }[];
  steps: string[];
  callout: string;
  quiz: { prompt: string; correct: string; distractor: string; rationale: string }[];
}

export function useBook() {
  const { status, data, retry } = useData(dataSource.getBook);
  return { status, book: data as Book | null, retry };
}
