import { Outlet } from 'react-router';

import { TopBar } from '../components/TopBar/TopBar';

export function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <TopBar />
      <Outlet />
    </div>
  );
}
