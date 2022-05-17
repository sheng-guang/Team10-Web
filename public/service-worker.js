/**
 * Service worker - Cache then network
 *
 * @author  Yanan Zhao
 */
let cache= null;
let dataCacheName = 'storyData-v1';
let cacheName = 'storyPWA-step-8-1';
let filesToCache = [
    '/',
    '/new',
    '/room',
    '/123',

    '/javascripts/jqury.js',
    '/javascripts/index.js',
    '/javascripts/DataBase.js',
    '/javascripts/idb.js',
    '/javascripts/canvas.js',
    '/javascripts/axios.js',
    '/javascripts/SendStory.js',
    '/javascripts/SyncDB.js',
    '/socket.io.js',
    '/javascripts/socket.io.js',
    '/socket.io/socket.io.js',
    '/javascripts/socket-io.js',

    '/stylesheets/css1.css',
    '/stylesheets/style.css',
    '/stylesheets/knowledge.css',
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
            return cache.addAll(filesToCache).then(x=>{
                console.log("success: "+x);

            })
                .catch(x=>{
                    console.error(x);
                });
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
});
