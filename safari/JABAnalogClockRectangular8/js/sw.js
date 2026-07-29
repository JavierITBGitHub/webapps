var CACHE_NAME = 'jabitxu-clock-v9';
var ASSETS_TO_CACHE = [
  '../',
  '../index.html?v=9',
  '../css/style.css?v=9',
  './clock.js?v=9',
  './sw.js?v=9',
  '../img/icona-ipad.png'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.url.indexOf('open-meteo.com') !== -1) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});