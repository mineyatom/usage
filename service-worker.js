const CACHE_NAME = "quiz-app-cache-v1";
const urlsToCache = [
    "index.html",
    "manifest.json",
    "icons/icon-192.png",
    "icons/icon-512.png"
];

// 安裝 Service Worker 並快取資源
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(self.skipWaiting())
    );
});

// 讓 Service Worker 控制新的頁面
self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

// 攔截網路請求，從快取讀取資源
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
