
// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-aest-caches';
var urlsToCache = [
    './',
    './index.html',
    './js/app.js',
    './js/jquery-3.7.1.min.js',
    './js/sw.js',
    './css/all.min.css',
    './css/sanitize.css',
    './css/style.css',
    './img/card.png',
    './img/heat.png',
    './img/mc.png',
    './img/plant.png',
    './img/steel.png',
    './img/titanium.png',
    './img/tr.png',
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