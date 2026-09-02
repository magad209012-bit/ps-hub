const CACHE_NAME = 'ps-hub-v2';

// تأكد أن أسماء الملفات هنا مطابقة تماماً لما هو موجود في المستودع
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './logo.png' // لو الصورة بصيغة jpg غيرها إلى ./logo.jpg
];

// التثبيت وتخزين الملفات
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // استخدام Promise.allSettled لضمان عدم تعطل الكاش لو فشل ملف واحد
      return Promise.allSettled(
        ASSETS.map((asset) =>
          cache.add(asset).catch((err) => console.warn('Failed to cache:', asset, err))
        )
      );
    })
  );
});

// التفعيل والسيطرة الفورية على الصفحة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// الاستجابة من الكاش عند انقطاع الإنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
