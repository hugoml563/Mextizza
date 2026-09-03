/*
 * Lleva la vista al primer campo que falta, con un desplazamiento suave.
 *
 * El boton de confirmar vive al fondo y los campos que marca la validacion
 * quedan arriba, fuera de vista: sin mover la pantalla, presionarlo no cambia
 * nada donde el usuario esta mirando y parece que no responde.
 *
 * La animacion es propia y no scrollIntoView({ behavior: 'smooth' }), porque en
 * el contenedor del carrito esa opcion no movia nada y fallaba en silencio. Aqui
 * se mueve scrollTop cuadro por cuadro, que funciona igual en los dos carritos.
 */
(function () {
  const DURACION = 420;

  // Desacelera al final: arranca rapido y se asienta, en vez de frenar de golpe.
  function suavizar(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function contenedorConScroll(el) {
    let a = el.parentElement;
    while (a && a !== document.body) {
      const cs = getComputedStyle(a);
      if (/auto|scroll/.test(cs.overflowY) && a.scrollHeight > a.clientHeight + 4) return a;
      a = a.parentElement;
    }
    return null;
  }

  function llevarAlPrimerFaltante() {
    // Field emite aria-invalid; RadioGroup no, y por eso lleva su propio marcador.
    const el = document.querySelector('[aria-invalid="true"], [data-invalido="true"]');
    if (!el) return;

    const cont = contenedorConScroll(el);
    if (!cont) { el.scrollIntoView({ block: 'center' }); return; }

    // Por rectangulos y no por offsetTop: el elemento que ancla las posiciones no
    // siempre es el contenedor que hace scroll.
    const rEl = el.getBoundingClientRect();
    const rCont = cont.getBoundingClientRect();
    const centrar = (rEl.top - rCont.top) - (cont.clientHeight / 2) + (rEl.height / 2);
    const tope = cont.scrollHeight - cont.clientHeight;
    const destino = Math.max(0, Math.min(tope, cont.scrollTop + centrar));
    const inicio = cont.scrollTop;
    const recorrido = destino - inicio;
    if (Math.abs(recorrido) < 2) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cont.scrollTop = destino;
      return;
    }

    const t0 = performance.now();
    let ultimo = inicio;
    let cancelada = false;
    const soltar = () => { cancelada = true; };
    cont.addEventListener('wheel', soltar, { passive: true, once: true });
    cont.addEventListener('touchstart', soltar, { passive: true, once: true });

    function limpiar() {
      clearTimeout(garantia);
      cont.removeEventListener('wheel', soltar);
      cont.removeEventListener('touchstart', soltar);
    }

    // Red de seguridad: si el documento se reporta oculto, el navegador congela
    // requestAnimationFrame y la animacion no arranca. Pasado el tiempo previsto
    // se salta al destino, para que el aviso se vea aunque no haya movimiento.
    const garantia = setTimeout(function () {
      if (!cancelada && Math.abs(cont.scrollTop - destino) > 2) cont.scrollTop = destino;
      limpiar();
    }, DURACION + 120);

    function paso(ahora) {
      // Si alguien mas movio el scroll, no peleamos por el control.
      if (cancelada || Math.abs(cont.scrollTop - ultimo) > 2) return limpiar();
      const t = Math.min(1, (ahora - t0) / DURACION);
      cont.scrollTop = inicio + recorrido * suavizar(t);
      ultimo = cont.scrollTop;
      if (t < 1) requestAnimationFrame(paso);
      else limpiar();
    }
    requestAnimationFrame(paso);
  }

  window.llevarAlPrimerFaltante = llevarAlPrimerFaltante;
})();
