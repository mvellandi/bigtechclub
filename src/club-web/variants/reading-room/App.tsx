import { Navigate, Route, Routes } from 'react-router-dom';
import { ChapterPage } from './chapter-page';
import { ContentsPage } from './contents-page';
import { ReadingRoomLayout } from './layout';
import { NotFoundPage } from './not-found-page';
import { readingRoomRoutes } from './routes';
import './reading-room.css';

export default function ReadingRoom() {
  return (
    <ReadingRoomLayout>
      <Routes>
        <Route path={readingRoomRoutes.home} element={<ContentsPage />} />
        <Route path={readingRoomRoutes.book} element={<Navigate to={readingRoomRoutes.home} replace />} />
        <Route path={readingRoomRoutes.chapter} element={<ChapterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ReadingRoomLayout>
  );
}
