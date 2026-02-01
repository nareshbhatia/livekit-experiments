export const RoutePathEnum = {
  Home: 'home',
  Buttons: 'buttons',
} as const;

export type RoutePath = (typeof RoutePathEnum)[keyof typeof RoutePathEnum];

export interface NavItem {
  path: string;
  title: string;
}

export const mainNavItems = new Map<RoutePath, NavItem>([
  ['home', { path: '/', title: 'Home' }],
  ['buttons', { path: '/buttons', title: 'Buttons' }],
]);
