self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', () => {
  // REMOVE AFTER BACKEND INTEGRATION:
  // handle push payload + notifications from backend.
});
