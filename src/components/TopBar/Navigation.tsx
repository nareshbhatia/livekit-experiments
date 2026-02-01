import { NavLink } from 'react-router';

import { mainNavItems, RoutePathEnum } from '../../config/RouteConfig';
import { cn } from '../../utils/cn';

export function Navigation() {
  return (
    <nav className="flex items-center gap-4 text-sm lg:gap-6">
      {Object.values(RoutePathEnum).map((routePath) => {
        const navItem = mainNavItems.get(routePath)!;
        return (
          <NavLink
            key={navItem.path}
            to={navItem.path}
            className={({ isActive }) =>
              cn(
                'transition-colors hover:text-foreground',
                isActive
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground',
              )
            }
          >
            {navItem.title}
          </NavLink>
        );
      })}
    </nav>
  );
}
