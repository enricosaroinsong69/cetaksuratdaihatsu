/* Formulir Data DO — D745 Tomohon
 * Service worker: aplikasi tetap bisa dibuka tanpa sinyal.
 * Naikkan VERSI tiap kali index.html diperbarui agar perangkat mengambil versi baru.
 */
const VERSI = 'form-do-v4';
const BERKAS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSI)
      .then(c => c.addAll(BERKAS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(n => n !== VERSI).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;

  // Jangan sentuh apa pun selain GET same-origin:
  // data stok (gviz) dan kiriman ke Apps Script harus lewat apa adanya.
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Halaman: ambil dari jaringan dulu supaya pembaruan cepat sampai,
  // jatuh ke simpanan kalau sedang tanpa sinyal.
  if (req.mode === 'navigate' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(req)
        .then(r => {
          const salinan = r.clone();
          caches.open(VERSI).then(c => c.put(req, salinan)).catch(() => {});
          return r;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Sisanya (ikon, manifest): dari simpanan dulu.
  e.respondWith(
    caches.match(req).then(r => r || fetch(req).then(res => {
      const salinan = res.clone();
      caches.open(VERSI).then(c => c.put(req, salinan)).catch(() => {});
      return res;
    }))
  );
});
