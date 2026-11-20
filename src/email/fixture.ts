import book from '../data/fixtures/book.json' with { type: 'json' };
import type { ChapterAnnouncementProps } from './chapter-announcement.tsx';

const chapter = book.chapters[0];

export const announcement: ChapterAnnouncementProps = {
  bookTitle: book.title,
  chapterTitle: chapter.title,
  chapterNumber: 1,
  chapterUrl: 'https://bigtechclub.com/club-web/#/book/' + chapter.slug,
  preheader: chapter.summary,
  excerpt: chapter.sections[0],
};

export const subject = book.title + ' · Chapter 1: ' + chapter.title;
