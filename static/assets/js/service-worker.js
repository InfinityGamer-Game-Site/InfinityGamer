
const CACHE_NAME = 'my-site-cache-v19';
let urlsToCache = [
  'index.html',
  'games/index.html',
  'assets/css/',
  'assets/js/',
  'assets/navbar.html',
  'games/display.html',
  'games/fullscreen.html'

  // Add more URLs to cache as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Exclude specific file from caching
  if (event.request.url.endsWith('assets/js/service-worker.js')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request to use it both for fetching and caching
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response to use it both for serving and caching
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

// Listen for messages to add new URLs to cache
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'ADD_TO_CACHE') {
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(event.data.urls);
    });
  }
});





