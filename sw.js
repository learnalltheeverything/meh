const CACHE_NAME = 'pwa-cache-v1';
const ASSETS = [
  './index.html',
  './style.css',
  './deck_list.html',
  './add_deck.html',
  './view_deck.html',
  './edit_deck.html',
  './delete_deck.html',
  './add_card.html',
  './edit_card.html',
  './delete_card.html',
  './progress_card.html',
  './reset_card.html',
  './review_next.html',
  './app.js',
  './manifest.json',
  './favicon.ico'
];

// Install Event - Caches app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.client.claim();
});

// Fetch Event - Serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});