
var SW_VERSION = '1.0.8';

// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja
// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = `pwa-aest-caches ${SW_VERSION}`;
var urlsToCache = [
    '/mars-ares/',
    '/mars-ares/index.html',
    '/mars-ares/sw.js',
    '/mars-ares/manifest.json',
    '/mars-ares/js/app.js',
    '/mars-ares/js/jquery-3.7.1.min.js',
    '/mars-ares/css/all.min.css',
    '/mars-ares/css/sanitize.css',
    '/mars-ares/css/style.css',
    '/mars-ares/img/card.png',
    '/mars-ares/img/heat.png',
    '/mars-ares/img/mc.png',
    '/mars-ares/img/plant.png',
    '/mars-ares/img/steel.png',
    '/mars-ares/img/titanium.png',
    '/mars-ares/img/tr.png',
    '/mars-ares/img/oxygen.png',
    '/mars-ares/img/temperature.png',
    '/mars-ares/img/forest.png',
    '/mars-ares/img/icon_192x192.png',
    '/mars-ares/img/icon_512x512.png',
    '/mars-ares/webfonts/fa-solid-900.ttf',
    '/mars-ares/webfonts/fa-solid-900.woff2',
    '/mars-ares/webfonts/MPLUSRounded1c-Regular.ttf',
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
