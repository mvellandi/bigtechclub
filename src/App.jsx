import { lazy, Suspense, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { LoadingGrid } from '@/components/page';
import { Button } from '@/components/ui/button';

const BookPage = lazy(() => import('@/pages/book-page').then((module) => ({ default: module.BookPage })));
const ChapterPage = lazy(() => import('@/pages/chapter-page').then((module) => ({ default: module.ChapterPage })));
const ContributePage = lazy(() => import('@/pages/contribute-page').then((module) => ({ default: module.ContributePage })));
const DirectoryPage = lazy(() => import('@/pages/directory-page').then((module) => ({ default: module.DirectoryPage })));
const HomePage = lazy(() => import('@/pages/home-page').then((module) => ({ default: module.HomePage })));
const LandscapePage = lazy(() => import('@/pages/landscape-page').then((module) => ({ default: module.LandscapePage })));
const LivePage = lazy(() => import('@/pages/live-page').then((module) => ({ default: module.LivePage })));
const MemberPage = lazy(() => import('@/pages/member-page').then((module) => ({ default: module.MemberPage })));
const MissionPage = lazy(() => import('@/pages/mission-page').then((module) => ({ default: module.MissionPage })));
const NotFoundPage = lazy(() => import('@/pages/not-found-page').then((module) => ({ default: module.NotFoundPage })));
const PrintPage = lazy(() => import('@/pages/print-page').then((module) => ({ default: module.PrintPage })));

export function App() {
  const main = useRef(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="shell">
      <Button className="skip" size="sm" onClick={() => main.current?.focus()}>Skip to content</Button>
      <SiteHeader />
      <main ref={main} id="main-content" tabIndex={-1}>
        <div className="wrap">
          <Suspense fallback={<LoadingGrid label="Loading page" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/book/landscape" element={<LandscapePage />} />
              <Route path="/book/print" element={<PrintPage />} />
              <Route path="/book/:slug" element={<ChapterPage />} />
              <Route path="/members" element={<DirectoryPage />} />
              <Route path="/members/:slug" element={<MemberPage />} />
              <Route path="/live" element={<LivePage />} />
              <Route path="/live/apply" element={<ContributePage />} />
              <Route path="/mission" element={<MissionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
