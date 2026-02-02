import { RootLayout } from './app/root';
import { NotFoundPage } from './app/routes/not-found/route';
import { VideoPublisherPage } from './app/routes/video-publisher/route';
import { VideoViewerPage } from './app/routes/video-viewer/route';
import { mainNavItems } from './config/RouteConfig';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <VideoPublisherPage />,
      },
      {
        path: mainNavItems.get('viewer')!.path,
        element: <VideoViewerPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
