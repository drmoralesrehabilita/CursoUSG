self.addEventListener('install', () => {
  // Forces the waiting service worker to become the active service worker
  self.skipWaiting()
  console.log('Service Worker installed')
})

self.addEventListener('activate', (event) => {
  // Claims all clients immediately
  event.waitUntil(self.clients.claim())
  console.log('Service Worker activated')
})

self.addEventListener('fetch', (event) => {
  // Basic pass-through fetch handler required for PWA installation
  event.respondWith(fetch(event.request))
})

self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/logos/raulmoralescolor.png',
      badge: '/logos/raulmoralescolor.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '1'
      }
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})
