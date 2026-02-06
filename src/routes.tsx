import { RootLayout } from './app/root';
import { CameraPage } from './app/routes/camera/route';
import { MeetPage } from './app/routes/meet/route';
import { NotFoundPage } from './app/routes/not-found/route';
import { ShareVideoPage } from './app/routes/share-video/route';
import { TracksPage } from './app/routes/tracks/route';
import { mainNavItems } from './config/RouteConfig';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MeetPage />,
      },
      {
        path: mainNavItems.get('tracks')!.path,
        element: <TracksPage />,
      },
      {
        path: mainNavItems.get('camera')!.path,
        element: <CameraPage />,
      },
      {
        path: mainNavItems.get('shareVideo')!.path,
        element: <ShareVideoPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
