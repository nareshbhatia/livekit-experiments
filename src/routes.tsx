import { RootLayout } from './app/root';
import { CameraPage } from './app/routes/camera/route';
import { Dashboard } from './app/routes/dashboard/route';
import { NotFoundPage } from './app/routes/not-found/route';
import { mainNavItems } from './config/RouteConfig';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: mainNavItems.get('camera')!.path,
        element: <CameraPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
