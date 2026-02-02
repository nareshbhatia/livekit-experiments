export const RoutePathEnum = {
  Publisher: 'publisher',
  Viewer: 'viewer',
} as const;

export type RoutePath = (typeof RoutePathEnum)[keyof typeof RoutePathEnum];

export interface NavItem {
  path: string;
  title: string;
}

export const mainNavItems = new Map<RoutePath, NavItem>([
  ['publisher', { path: '/', title: 'Publisher' }],
  ['viewer', { path: '/viewer', title: 'Viewer' }],
]);
