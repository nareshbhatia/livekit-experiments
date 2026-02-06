export const RoutePathEnum = {
  Meet: 'meet',
  Tracks: 'tracks',
  Camera: 'camera',
  ShareVideo: 'shareVideo',
} as const;

export type RoutePath = (typeof RoutePathEnum)[keyof typeof RoutePathEnum];

export interface NavItem {
  path: string;
  title: string;
}

export const mainNavItems = new Map<RoutePath, NavItem>([
  ['meet', { path: '/', title: 'Meet' }],
  ['tracks', { path: '/tracks', title: 'Tracks' }],
  ['camera', { path: '/camera', title: 'Camera' }],
  ['shareVideo', { path: '/share-video', title: 'Share Video' }],
]);
