let cache= null;
let dataCacheName = 'storyData-v1';
let cacheName = 'storyPWA-step-8-1';
let filesToCache = [
    '/',
    '/stylesheets/acp21zo.css',
    '/stylesheets/style.css'
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

/**
 * this is called every time a file is fetched. This is a middleware, i.e. this method is
 * called every time a page is fetched by the browser
 */
self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    e.respondWith(
        fetch(e.request).catch(function () {
            return caches.match(e.request);
        })
    )
    // if (e.request.url.indexOf(dataUrl) > -1) {
    //     /*
    //      * "Cache then network" strategy
    //      */
    //     return fetch(e.request)
    //         .then( (response) => {
    //             return response;
    //         })
    //         .catch((error) => {
    //             return error;
    //         })
    // } else {
    //     /*
    //      * "Cache, falling back to the network" offline strategy
    //      */
    //     e.respondWith(
    //         caches.match(e.request).then(function (response) {
    //             return response
    //                 || fetch(e.request)
    //                     .then(function (response) {
    //                         if (!response.ok ||  response.statusCode>299) {
    //                             console.log("error: " + response.error());
    //                         } else {
    //                             cache.add(e.request.url);
    //                             return response;
    //                         }
    //                     })
    //                     .catch(function (err) {
    //                         console.log("error: " + err);
    //                     })
    //         })
    //     );
    // }
});
