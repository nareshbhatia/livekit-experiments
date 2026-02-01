import { AtomIcon } from 'lucide-react';

import { ModeToggle } from './ModeToggle';
import { Navigation } from './Navigation';
import { siteConfig } from '../../config/site';

export function TopBar() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] h-14 px-4 border-b">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <AtomIcon className="size-6" />
        <span>{siteConfig.name}</span>
      </div>

      {/* Center Section */}
      <Navigation />

      {/* Right Section */}
      <div className="flex items-center gap-6 justify-end">
        <ModeToggle />
      </div>
    </header>
  );
}
