/* Service worker de mextizza.com. Solo hace una cosa: mostrar los avisos de un
   pedido (por ejemplo, que la cocina lo cancelo) aunque el cliente haya cerrado
   la pagina.

   No guarda nada en cache a proposito: el sitio tiene que mostrar siempre la
   carta y los precios de ahorita. Sin manejador de fetch, el navegador sigue
   pidiendo todo a la red como si este archivo no existiera.

   Mismo formato que templates/sales-center/sw-cocina.js: el aviso llega como un
   push normal con los datos que manda Code.gs (titulo, cuerpo, url, tag). */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  let p = {};
  try { p = e.data ? e.data.json() : {}; } catch (err) { p = {}; }
  const d = p.data || p.notification || p;
  e.waitUntil(self.registration.showNotification(d.titulo || d.title || 'Mextizza', {
    body: d.cuerpo || d.body || 'Hay novedades de tu pedido.',
    icon: '/assets/social/mextizza-app-icon-192.png',
    // Un aviso por pedido: si llega dos veces, se reemplaza.
    tag: d.tag || undefined,
    renotify: !!d.tag,
    vibrate: [200, 100, 200],
    data: { url: d.url || '/' }
  }));
});

/* Tocar el aviso abre el pedido. Si mextizza.com ya esta abierto, se trae al
   frente y se lleva al pedido en vez de abrir otra pestana. */
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || '/', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ventanas) => {
    for (const v of ventanas) {
      if (v.url.indexOf(self.registration.scope) === 0 && 'focus' in v) {
        if ('navigate' in v) v.navigate(url);
        return v.focus();
      }
    }
    return self.clients.openWindow(url);
  }));
});
