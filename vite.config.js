import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const baseUrl = '/';

export default defineConfig({
  base: baseUrl,
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      injectManifest: {
        swSrc: 'src/sw.js',
        swDest: 'dist/sw.js',
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Story Share App',
        short_name: 'StoryShare',
        description: 'Story Share adalah aplikasi untuk berbagi cerita.',
        theme_color: '#ffffff',
        display: 'standalone',
        start_url: baseUrl,
        scope: baseUrl,
        icons: [
          {
            src: `${baseUrl}pwa-144x144.png`,
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: `${baseUrl}pwa-192x192.png`,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: `${baseUrl}pwa-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: `${baseUrl}screenshots/screenshot1.png`,
            sizes: '3048x1920',
            form_factor: 'wide',
          },
          {
            src: `${baseUrl}screenshots/screenshot2.png`,
            sizes: '3048x1920',
            form_factor: 'wide',
          },
          {
            src: `${baseUrl}screenshots/screenshot3.png`,
            sizes: '3048x1920',
            form_factor: 'wide',
          },
          {
            src: `${baseUrl}screenshots/screenshot4.png`,
            sizes: '528x1003',
            form_factor: 'narrow',
          },
          {
            src: `${baseUrl}screenshots/screenshot5.png`,
            sizes: '528x1003',
            form_factor: 'narrow',
          },
          {
            src: `${baseUrl}screenshots/screenshot6.png`,
            sizes: '528x1003',
            form_factor: 'narrow',
          },
        ],
        shortcuts: [
          {
            name: 'Tambah Cerita',
            short_name: 'Tambah',
            url: `${baseUrl}#/add`,
          },
        ],
      },
    }),
  ],
});
