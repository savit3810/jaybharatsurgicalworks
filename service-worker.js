const CACHE_NAME = "industry-store-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/cart.html",
  "/account.html",
  "/signup.html",
  "/login.html",
  "/myorder.html",
  "/payment.html",
  "/categories.html",
  "/styles.css",
  "/script.js",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
];

// Install event — cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate event — cleanup old caches if needed
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch event — serve from cache first, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          return new Response("You're offline. Please check your connection.");
        })
      );
    })
  );
});
