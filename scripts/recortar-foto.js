#!/usr/bin/env node
/*
 * Recorta una foto de platillo antes de sacar sus tres versiones.
 *
 *   node scripts/recortar-foto.js pizza-newyork pizza-traviesa
 *
 * La Newyork y la Traviesa vienen de originales horizontales (1280x960) con
 * mucha madera alrededor: en la carta la pizza se veia chica junto a las demas,
 * que llenan el cuadro. Aqui se recortan a un cuadrado centrado en la pizza,
 * igual que la Provola y la Chisi, y se sacan las versiones con la regla que
 * ya usa el menu: lado largo de 1100 / 600 / 220, sin agrandar.
 *
 * El recorte vive en RECORTES y no en un JPG editado: el original se queda
 * intacto, y volver a correr esto da exactamente lo mismo.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const CARPETA = path.join(__dirname, '..', 'assets', 'photos');

/* Pixeles del original. El centro de cada pizza se midio en la foto: las dos
   estan un poco a la izquierda, asi que un recorte al centro exacto les
   cortaba la orilla de ese lado. */
const RECORTES = {
  'pizza-newyork': { left: 144, top: 0, width: 960, height: 960 },
  'pizza-traviesa': { left: 128, top: 0, width: 960, height: 960 },
};

const VERSIONES = [
  { sufijo: '', lado: 1100, calidad: 80 },
  { sufijo: '-md', lado: 600, calidad: 72 },
  { sufijo: '-thumb', lado: 220, calidad: 80 },
];

(async () => {
  const nombres = process.argv.slice(2);
  if (!nombres.length) throw new Error('Falta el nombre. Ejemplo: node scripts/recortar-foto.js pizza-newyork');
  for (const nombre of nombres) {
    const recorte = RECORTES[nombre];
    if (!recorte) throw new Error('No hay recorte definido para ' + nombre);
    const origen = ['.jpeg', '.jpg', '.png'].map((e) => path.join(CARPETA, nombre + e)).find((p) => fs.existsSync(p));
    if (!origen) throw new Error('No encontre el original de ' + nombre);
    for (const v of VERSIONES) {
      const salida = path.join(CARPETA, nombre + v.sufijo + '.webp');
      const lado = Math.min(v.lado, recorte.width);
      await sharp(origen).extract(recorte).resize(lado, lado).webp({ quality: v.calidad }).toFile(salida);
      console.log('  ' + path.basename(salida).padEnd(28) + lado + 'x' + lado + '  ' +
        Math.round(fs.statSync(salida).size / 1024) + ' KB');
    }
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
