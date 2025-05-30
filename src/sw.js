import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { baseApiUrl } from './utils';

precacheAndRoute(self.__WB_MANIFEST || []);

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
