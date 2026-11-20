import { clubRoutes } from './routes';
import { lazy, Suspense, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteFooter } from '@/components/site-footer';
import { LoadingGrid } from '@/components/page';
import { Button } from '@/components/ui/button';

const BookPage = lazy(() => import('@/pages/book-page').then((module) => ({ default: module.BookPage })));
const ChapterPage = lazy(() => import('@/pages/chapter-page').then((module) => ({ default: module.ChapterPage })));
const ContributePage = lazy(() => import('@/pages/contribute-page').then((module) => ({ default: module.ContributePage })));
const DirectoryPage = lazy(() => import('@/pages/directory-page').then((module) => ({ default: module.DirectoryPage })));
const LandscapePage = lazy(() => import('@/pages/landscape-page').then((module) => ({ default: module.LandscapePage })));
const LivePage = lazy(() => import('@/pages/live-page').then((module) => ({ default: module.LivePage })));
const MemberPage = lazy(() => import('@/pages/member-page').then((module) => ({ default: module.MemberPage })));
const MissionPage = lazy(() => import('@/pages/mission-page').then((module) => ({ default: module.MissionPage })));
const NotFoundPage = lazy(() => import('@/pages/not-found-page').then((module) => ({ default: module.NotFoundPage })));
const PrintPage = lazy(() => import('@/pages/print-page').then((module) => ({ default: module.PrintPage })));

export function ClubLayout({ header, home }) {
  const main = useRef(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="shell">
      <Button className="skip" size="sm" onClick={() => main.current?.focus()}>Skip to content</Button>
      {header}
      <main ref={main} id="main-content" tabIndex={-1}>
        <div className="wrap">
          <Suspense fallback={<LoadingGrid label="Loading page" />}>
            <Routes>
              <Route path={clubRoutes.home} element={home} />
              <Route path={clubRoutes.book} element={<BookPage />} />
              <Route path={clubRoutes.landscape} element={<LandscapePage />} />
              <Route path={clubRoutes.print} element={<PrintPage />} />
              <Route path={clubRoutes.chapter} element={<ChapterPage />} />
              <Route path={clubRoutes.members} element={<DirectoryPage />} />
              <Route path={clubRoutes.member} element={<MemberPage />} />
              <Route path={clubRoutes.live} element={<LivePage />} />
              <Route path={clubRoutes.contribute} element={<ContributePage />} />
              <Route path={clubRoutes.mission} element={<MissionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
