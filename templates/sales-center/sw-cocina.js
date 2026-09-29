/* Service worker del Centro de Ventas. Solo hace una cosa: recibir los avisos
   push de pedidos nuevos y mostrarlos, aunque el tablero este cerrado.

   No guarda nada en cache a proposito. El tablero tiene que mostrar siempre
   los pedidos de ahorita, y un service worker que sirviera una version vieja
   de la pagina seria peor que no tener ninguno.

   No carga el SDK de Firebase: el aviso llega como un push normal del
   navegador, con los datos que manda Code.gs (titulo, cuerpo, url, tag). */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  let p = {};
  try { p = e.data ? e.data.json() : {}; } catch (err) { p = {}; }
  // FCM entrega los datos dentro de "data"; se aceptan tambien sueltos.
  const d = p.data || p.notification || p;
  const titulo = d.titulo || d.title || 'Mextizza — Cocina';
  e.waitUntil(self.registration.showNotification(titulo, {
    body: d.cuerpo || d.body || 'Hay algo nuevo en el Centro de Ventas.',
    icon: '/assets/social/cocina-icon-192.png',
    // Un aviso por folio: si llega dos veces, se reemplaza en vez de apilarse.
    tag: d.tag || undefined,
    renotify: !!d.tag,
    vibrate: [220, 120, 220],
    data: { url: d.url || './SalesCenter.dc.html' }
  }));
});

/* Tocar el aviso lleva al tablero. Si ya hay uno abierto se trae al frente en
   vez de abrir otro: dos tableros encima harian sonar todo dos veces. */
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './SalesCenter.dc.html',
    self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ventanas) => {
    for (const v of ventanas) {
      if (v.url.indexOf(self.registration.scope) === 0 && 'focus' in v) {
        if ('navigate' in v && url.indexOf('vista=') !== -1) v.navigate(url);
        return v.focus();
      }
    }
    return self.clients.openWindow(url);
  }));
});
