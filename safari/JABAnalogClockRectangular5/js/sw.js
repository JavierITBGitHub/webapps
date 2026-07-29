var CACHE_NAME = 'jabitxu-clock-v2';
var ASSETS_TO_CACHE = [
  '../',
  '../index.html',
  '../css/style.css',
  './clock.js',
  './sw.js',
  '../img/icona-ipad.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', function(e) {
  // Ignorem les peticions exteriors de la intempèrie per evitar bloquejos a la memòria cau
  if (e.request.url.indexOf('open-meteo.com') !== -1) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});