import { RootLayout } from './app/root';
import { ButtonsPage } from './app/routes/buttons/route';
import { HomePage } from './app/routes/home/route';
import { NotFoundPage } from './app/routes/not-found/route';
import { mainNavItems } from './config/RouteConfig';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: mainNavItems.get('buttons')!.path,
        element: <ButtonsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
