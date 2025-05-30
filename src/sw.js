import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { baseApiUrl, baseUrl } from './utils';

precacheAndRoute(self.__WB_MANIFEST || []);

self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const body = data?.options?.body ?? 'Story baru telah diposting';

  event.waitUntil(
    self.registration.showNotification('StoryShare', {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        {
          action: 'explore',
          title: 'Lihat Cerita',
          icon: '/favicon.ico',
        },
        {
          action: 'close',
          title: 'Tutup',
          icon: '/favicon.ico',
        },
      ],
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;

  if (action === 'explore') {
    event.waitUntil(clients.openWindow(`${baseUrl}#/feed`));
  } else if (action === 'close') {
    notification.close();
  }

  notification.close();
});

registerRoute(
  ({ request }) => request.mode == 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages',
  })
);

registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'assets',
  })
);

registerRoute(
  ({ url }) => {
    return (
      url.origin == 'https://fonts.googleapis.com' ||
      url.origin == 'https://fonts.gstatic.com'
    );
  },
  new CacheFirst({
    cacheName: 'google-fonts',
  })
);

registerRoute(
  ({ url }) => {
    return (
      url.origin == 'https://cdn.jsdelivr.net' ||
      url.origin == 'https://cdnjs.cloudflare.com'
    );
  },
  new CacheFirst({
    cacheName: 'jsdelivr-cdn',
  })
);

registerRoute(
  ({ url }) => {
    return url.href.startsWith(`${baseApiUrl}/images`);
  },
  new StaleWhileRevalidate({
    cacheName: 'story-api-images',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);
