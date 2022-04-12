let cache= null;
//let dataCacheName = 'weatherData-v1';
//let cacheName = 'weatherPWA-step-8-1';
let filesToCache = [
    '/',
    '/scripts/app.js',
    '/styles/inline.css',
    '/styles/bootstrap.css',
    '/scripts/bootstrap.js',
    '/scripts/jquery.min.js',
    '/scripts/database.js',
    '/scripts/idb/index.js',
    '/favicon.ico'
];

/**
 * installation event: it adds all the files to be cached
 */
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cacheX) {
            console.log('[ServiceWorker] Caching app shell');
            cache= cacheX;
            return cache.addAll(filesToCache);
        })
    );
});

/**
 * activation of service worker: it removes all cashed files if necessary
 */
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});
