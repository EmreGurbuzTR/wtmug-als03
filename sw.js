/* Hava Durumu PWA — Service Worker
   Strateji:
   - Uygulama kabuğu (HTML, manifest, ikon) : cache-first
   - API çağrıları (open-meteo.com)         : network-only (veri taze olmalı)
*/
const CACHE = 'hava-pwa-v1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API çağrılarını asla cache'leme — her zaman canlı veri gelsin
  if (url.hostname.includes('open-meteo.com')) return;

  // Sadece GET isteklerini işle
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        // Başarılı yanıtları önbelleğe al (aynı origin)
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(event.request, copy));
        }
        return res;
      }).catch(() => {
        // Çevrimdışıysa ve HTML istendiyse index.html'i döndür
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});