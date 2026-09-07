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
      'ui_kits/Puntos.jsx',
      'ui_kits/Recoger.jsx',
      'ui_kits/DeliveryForm.jsx',
      'ui_kits/TarjetaPremios.jsx',
      'ui_kits/web/CartDrawer.jsx',
      'ui_kits/web/AddonsDialog.jsx',
      'ui_kits/web/Site.jsx',
    ],
  },
  {
    salida: 'ui_kits/app/bundle.build.js',
    fuentes: [
      'ui_kits/Puntos.jsx',
      'ui_kits/Recoger.jsx',
      'ui_kits/DeliveryForm.jsx',
      'ui_kits/TarjetaPremios.jsx',
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

/* El horario vive en dos lugares que no se pueden ver entre si: MEXTIZZA_FACTS
   en menu-data.js (navegador) y HORARIO en Code.gs (Apps Script). Los dos tienen
   que decir lo mismo o el sitio y el servidor discrepan sobre cuando se puede
   pedir. Aqui se comparan y el build se detiene si dejan de coincidir. */
function verificarHorario() {
  global.window = {};
  require(path.join(RAIZ, 'ui_kits', 'menu-data.js'));
  const web = global.window.MEXTIZZA_FACTS.horario;

  const gs = fs.readFileSync(path.join(RAIZ, 'integration', 'sheets-backend', 'Code.gs'), 'utf8');
  const m = gs.match(/const HORARIO = \{ dias: \[([^\]]*)\], desde: (\d+), hasta: (\d+) \};/);
  if (!m) throw new Error('no encontre la constante HORARIO en Code.gs');

  const dias = m[1].split(',').map((x) => Number(x.trim()));
  const igual =
    dias.length === web.dias.length &&
    dias.every((d, i) => d === web.dias[i]) &&
    Number(m[2]) === web.desde &&
    Number(m[3]) === web.hasta;

  if (!igual) {
    throw new Error([
      'El horario no coincide entre las dos capas.',
      '    menu-data.js: dias=[' + web.dias + '] ' + web.desde + '-' + web.hasta,
      '    Code.gs:      dias=[' + dias + '] ' + m[2] + '-' + m[3],
      '  Actualiza los dos antes de construir.',
    ].join('\n'));
  }
  console.log('  horario: menu-data.js y Code.gs coinciden (' + web.texto + ')');
}

/* Los premios tambien viven en dos capas: PREMIO_PRODUCTOS en TarjetaPremios.jsx
   (lo que la interfaz ofrece canjear) y PREMIOS en Code.gs (lo que el servidor
   regala de verdad). Si se separan, el cliente pide su brownie, el servidor no
   se lo da, y no hay error visible en ninguna de las dos capas. */
function verificarPremios() {
  const ui = fs.readFileSync(path.join(RAIZ, 'ui_kits', 'TarjetaPremios.jsx'), 'utf8');
  const mu = ui.match(/const PREMIO_PRODUCTOS = \{ brownie: '([^']+)', pizza: '([^']+)' \};/);
  if (!mu) throw new Error('no encontre PREMIO_PRODUCTOS en TarjetaPremios.jsx');

  const gs = fs.readFileSync(path.join(RAIZ, 'integration', 'sheets-backend', 'Code.gs'), 'utf8');
  const mb = gs.match(/brownie:\s*\{ dia: (\d+), producto: '([^']+)' \}/);
  const mp = gs.match(/pizza:\s*\{ dia: (\d+), producto: '([^']+)' \}/);
  if (!mb || !mp) throw new Error('no encontre la constante PREMIOS en Code.gs');

  if (mu[1] !== mb[2] || mu[2] !== mp[2]) {
    throw new Error([
      'Los productos de premio no coinciden entre las dos capas.',
      '    TarjetaPremios.jsx: brownie=' + mu[1] + ' pizza=' + mu[2],
      '    Code.gs:            brownie=' + mb[2] + ' pizza=' + mp[2],
      '  Actualiza los dos antes de construir.',
    ].join('\n'));
  }

  // Las casillas marcadas en la tarjeta tienen que caer en los dias del premio,
  // o la tarjeta promete el brownie en una casilla y llega en otra.
  const cb = Number((ui.match(/const CASILLA_BROWNIE = (\d+);/) || [])[1]);
  const cp = Number((ui.match(/const CASILLA_PIZZA = (\d+);/) || [])[1]);
  if (cb !== Number(mb[1]) || cp !== Number(mp[1])) {
    throw new Error([
      'Las casillas de la tarjeta no coinciden con los dias del premio.',
      '    TarjetaPremios.jsx: brownie en la ' + cb + ', pizza en la ' + cp,
      '    Code.gs:            brownie al dia ' + mb[1] + ', pizza al dia ' + mp[1],
    ].join('\n'));
  }
  // El descuento por recoger tambien vive en dos capas.
  const dUi = Number((fs.readFileSync(path.join(RAIZ, 'ui_kits', 'menu-data.js'), 'utf8')
    .match(/const MEXTIZZA_PICKUP_DESCUENTO = (\d+);/) || [])[1]);
  const dGs = Number((gs.match(/const PICKUP_DESCUENTO = (\d+);/) || [])[1]);
  if (!dUi || !dGs || dUi !== dGs) {
    throw new Error('El descuento por recoger no coincide: menu-data.js=' + dUi +
      ' Code.gs=' + dGs + '. Actualiza los dos antes de construir.');
  }
  // El interruptor del servicio tambien vive en dos capas. Si se separan, el
  // checkout ofrece recoger y el servidor rechaza el pedido, o al reves: la
  // opcion desaparece pero el descuento sigue al alcance de quien lo pida a mano.
  const menu = fs.readFileSync(path.join(RAIZ, 'ui_kits', 'menu-data.js'), 'utf8');
  const aUi = (menu.match(/const MEXTIZZA_PICKUP_ACTIVO = (true|false);/) || [])[1];
  const aGs = (gs.match(/const PICKUP_ACTIVO = (true|false);/) || [])[1];
  if (!aUi || !aGs) throw new Error('no encontre el interruptor de pickup en alguna de las dos capas');
  if (aUi !== aGs) {
    throw new Error([
      'El servicio de recoger no dice lo mismo en las dos capas.',
      '    menu-data.js: ' + aUi,
      '    Code.gs:      ' + aGs,
      '  Los dos tienen que decir lo mismo antes de construir.',
    ].join('\n'));
  }
  console.log('  pickup: servicio ' + (aGs === 'true' ? 'ACTIVO' : 'apagado') +
    ' en las dos capas, descuento de $' + dGs);
  console.log('  premios: TarjetaPremios.jsx y Code.gs coinciden (brownie dia ' +
    mb[1] + ', ' + mp[2] + ' dia ' + mp[1] + ')');
}

verificarHorario();
verificarPremios();

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
