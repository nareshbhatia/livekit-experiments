export const RoutePathEnum = {
  Dashboard: 'dashboard',
  Camera: 'camera',
} as const;

export type RoutePath = (typeof RoutePathEnum)[keyof typeof RoutePathEnum];

export interface NavItem {
  path: string;
  title: string;
}

export const mainNavItems = new Map<RoutePath, NavItem>([
  ['dashboard', { path: '/', title: 'Dashboard' }],
  ['camera', { path: '/camera', title: 'Camera' }],
]);
