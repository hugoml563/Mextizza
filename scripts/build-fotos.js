#!/usr/bin/env node
/*
 * Genera las tres versiones de una foto de platillo.
 *
 *   node scripts/build-fotos.js pizza-cochinita
 *
 * Toma assets/photos/<nombre>.(jpeg|jpg|png) y escribe:
 *
 *   <nombre>.webp        880x1100  la que se ve en la ficha del platillo
 *   <nombre>-md.webp     480x600   pantallas medianas
 *   <nombre>-thumb.webp  176x220   el renglon del carrito
 *
 * Todas en 4:5, que es la proporcion que ya usan las demas fotos del menu: si
 * una sola llega con otra forma, la reja del menu se desalinea.
 *
 * El recorte es centrado y con `attention`, que busca la zona con mas detalle
 * en vez de asumir que el platillo esta a la mitad. Las fotos de comida rara
 * vez estan perfectamente centradas.
 *
 * La pizza rotativa cambia cada mes, asi que esto es un comando y no un
 * procedimiento a mano: las tres versiones se quedaban desincronizadas en
 * cuanto alguien reemplazaba solo la grande.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const RAIZ = path.join(__dirname, '..');
const CARPETA = path.join(RAIZ, 'assets', 'photos');

// Mismas medidas que el resto del menu. Verificadas contra pizza-aloha.
/* Las calidades estan calibradas contra las fotos que ya existen: con 82 la
   grande pesaba 268 KB contra los 197 KB de pizza-aloha, y la foto nueva se
   convertia en lo mas pesado de la pagina. */
const TAMANOS = [
  { sufijo: '', ancho: 880, alto: 1100, calidad: 72 },
  { sufijo: '-md', ancho: 480, alto: 600, calidad: 70 },
  { sufijo: '-thumb', ancho: 176, alto: 220, calidad: 72 },
];

const nombre = process.argv[2];
if (!nombre) {
  console.error('Falta el nombre. Ejemplo:\n  node scripts/build-fotos.js pizza-cochinita');
  process.exit(1);
}

const origen = ['.jpeg', '.jpg', '.png', '.webp']
  .map((ext) => path.join(CARPETA, nombre + ext))
  .find((p) => fs.existsSync(p));

if (!origen) {
  console.error('No encontre assets/photos/' + nombre + '.(jpeg|jpg|png) — revisa el nombre.');
  process.exit(1);
}

(async () => {
  const meta = await sharp(origen).metadata();
  console.log('\n  origen: ' + path.basename(origen) + '  ' + meta.width + 'x' + meta.height);

  for (const t of TAMANOS) {
    const salida = path.join(CARPETA, nombre + t.sufijo + '.webp');
    await sharp(origen)
      .resize(t.ancho, t.alto, { fit: 'cover', position: sharp.strategy.attention })
      .webp({ quality: t.calidad })
      .toFile(salida);
    const kb = Math.round(fs.statSync(salida).size / 1024);
    console.log('  ' + path.basename(salida).padEnd(30) + t.ancho + 'x' + t.alto + '  ' + kb + ' KB');
  }

  console.log('\n  Listo. Falta apuntar la foto en ui_kits/menu-data.js si es un platillo nuevo.\n');
})().catch((e) => {
  console.error('Fallo al procesar la foto: ' + e.message);
  process.exit(1);
});
