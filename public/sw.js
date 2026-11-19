// Momentum Tools service worker: makes the app work offline.
// Change VERSION only if you ever need to force every phone to clear its saved copy.
const VERSION = "v1";
const APP_CACHE = "momentum-app-" + VERSION;
const FONT_CACHE = "momentum-fonts-" + VERSION;
// Resolve paths against wherever the app is hosted (domain root or a GitHub Pages sub-path).
const BASE = self.registration.scope;
const at = (p) => new URL(p, BASE).href;
const INDEX = at("index.html");

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(APP_CACHE);
      // Save the page and every file it needs, so the app opens offline after the first visit.
      const res = await fetch(INDEX, { cache: "reload" });
      const html = await res.clone().text();
      await cache.put(INDEX, res);
      const urls = new Set(["manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "favicon-32.png"].map(at));
      const re = /(?:src|href)="((?:\.?\/)?assets\/[^"]+)"/g;
      let m;
      while ((m = re.exec(html))) urls.add(at(m[1]));
      await Promise.all([...urls].map((u) => cache.add(u).catch(() => {})));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = [APP_CACHE, FONT_CACHE];
      const names = await caches.keys();
      await Promise.all(names.filter((n) => !keep.includes(n)).map((n) => caches.delete(n)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: save after first online use so text looks the same offline.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(FONT_CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        const fetching = fetch(req)
          .then((res) => {
            if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || fetching;
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Opening the app: try the network first (so updates arrive), fall back to the saved copy offline.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(APP_CACHE).then((c) => c.put(INDEX, copy));
          return res;
        })
        .catch(() => caches.match(INDEX))
    );
    return;
  }

  // Everything else (built files, icons): saved copy first, then network and save it.
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(APP_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
    )
  );
});
