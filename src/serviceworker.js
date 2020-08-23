importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

import {registerRoute} from 'workbox-routing';
import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';

const CACHE_NAME = "version-1";
const urlsToCache = ["./index.html", "./offline.html"];

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// workbox.routing.registerRoute(
//   new RegExp("\\.js$"),
//   new workbox.strategies.CacheFirst()
// );

registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;900&display=swap',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Push notification
self.addEventListener("push", (event) => {
  const title = "Get Started With Workbox";
  const options = {
    body: event.data.text(),
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch((err) => console.log("Error:", err))
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWithelist = [];
  cacheWithelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWithelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// precacheAndRoute(self.__WB_MANIFEST);
self.__precacheManifest = urlsToCache;
workbox.precaching.precacheAndRoute(self.__precacheManifest);
