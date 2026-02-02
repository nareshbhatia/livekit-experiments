export const RoutePathEnum = {
  Tracks: 'tracks',
  Camera: 'camera',
} as const;

export type RoutePath = (typeof RoutePathEnum)[keyof typeof RoutePathEnum];

export interface NavItem {
  path: string;
  title: string;
}

export const mainNavItems = new Map<RoutePath, NavItem>([
  ['tracks', { path: '/', title: 'Tracks' }],
  ['camera', { path: '/camera', title: 'Camera' }],
]);
