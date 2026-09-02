#!/usr/bin/env node
/*
 * Compila el JSX en el momento de construir, no en el navegador del cliente.
 *
 * Antes, las paginas cargaban @babel/standalone (3 MB) desde un CDN y compilaban
 * cada .jsx en cada visita. Este script hace ese trabajo una sola vez y deja un
 * .js listo, que es lo unico que se envia por la red.
 *
 * Cada archivo se envuelve en su propia funcion. Babel standalone le daba ambito
 * privado a cada <script type="text/babel">, asi que hay nombres de ayudantes
 * repetidos entre archivos (por ejemplo Field, en CartDrawer y en DeliveryForm).
 * Concatenarlos planos rompe con "Identifier already declared". Lo que un archivo
 * comparte con los demas ya viaja por window, via los Object.assign del final.
 */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const RAIZ = path.join(__dirname, '..');

// El orden importa: cada archivo publica sus componentes en window y el
// siguiente los usa. Es el mismo orden en que los cargaban los <script>.
const PAQUETES = [
  {
    salida: 'ui_kits/web/bundle.build.js',
    fuentes: [
      'ui_kits/web/WebSurfaces.jsx',
      'ui_kits/DeliveryForm.jsx',
      'ui_kits/web/CartDrawer.jsx',
      'ui_kits/web/AddonsDialog.jsx',
      'ui_kits/web/Site.jsx',
    ],
  },
  {
    salida: 'ui_kits/app/bundle.build.js',
    fuentes: [
      'ui_kits/DeliveryForm.jsx',
      'ui_kits/app/AppScreens.jsx',
      'ui_kits/app/AppMobile.jsx',
    ],
  },
];

function compilar(rel) {
  const abs = path.join(RAIZ, rel);
  const codigo = fs.readFileSync(abs, 'utf8');
  const res = babel.transformSync(codigo, {
    filename: abs,
    babelrc: false,
    configFile: false,
    compact: false,
    // "classic" emite React.createElement contra el React global. El runtime
    // automatico emitiria import, que un script clasico no puede ejecutar.
    presets: [['@babel/preset-react', { runtime: 'classic' }]],
  });
  return res.code;
}

let totalAntes = 0;
let totalDespues = 0;

for (const paquete of PAQUETES) {
  const partes = paquete.fuentes.map((rel) => {
    const antes = fs.statSync(path.join(RAIZ, rel)).size;
    totalAntes += antes;
    return '/* ' + rel + ' */\n(function () {\n' + compilar(rel) + '\n})();';
  });

  const salida = path.join(RAIZ, paquete.salida);
  const contenido =
    '/* Generado por scripts/build-js.js. No editar a mano:\n' +
    '   los cambios van en los .jsx de origen. */\n\n' +
    partes.join('\n\n');

  fs.writeFileSync(salida, contenido);
  const despues = fs.statSync(salida).size;
  totalDespues += despues;
  console.log(
    '  ' + paquete.salida.padEnd(32) +
    Math.round(despues / 1024) + ' KB  (' + paquete.fuentes.length + ' archivos)'
  );
}

console.log(
  '\n  JSX de origen: ' + Math.round(totalAntes / 1024) + ' KB' +
  '  ->  compilado: ' + Math.round(totalDespues / 1024) + ' KB' +
  '\n  Babel ya no se envia al navegador: 3,064 KB menos por visita.'
);
