/* Imagenes de la pizza para el pase de Google Wallet.

   El pase muestra una imagen ancha (la "hero") debajo del encabezado. Es la
   misma pizza de la tarjeta de la web, dibujada por el MISMO componente
   (PizzaSellos en ui_kits/TarjetaPremios.jsx): si cambia el dibujo alla,
   basta con volver a correr esto. Google no ejecuta codigo, asi que se guarda
   una imagen por estado y Code.gs elige cual mostrar:

     assets/wallet/pizza-<rebanadas>.png           0 a 9
     assets/wallet/pizza-<rebanadas>-brownie.png   con el brownie listo para cobrar

   Corre con: npm run build:wallet. Las imagenes se sirven desde mextizza.com,
   asi que tienen que estar en produccion antes de que un pase las pida. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const babel = require('@babel/core');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');

const RAIZ = path.join(__dirname, '..');
const SALIDA = path.join(RAIZ, 'assets', 'wallet');

// Variables de color de tokens/colors.css, resueltas aunque apunten a otras.
// Sin comentarios: uno de ellos menciona '--surface-page:' y se leia como variable.
const css = fs.readFileSync(path.join(RAIZ, 'tokens', 'colors.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const vars = {};
css.replace(/--([\w-]+)\s*:\s*([^;]+);/g, (_, k, v) => { vars[k] = v.trim(); });
const resolver = (v, n = 0) => (n > 8 ? v : v.replace(/var\(--([\w-]+)\)/g, (_, k) => resolver(vars[k] || '#000', n + 1)));
/* La letra de los numeros (Bungee) es web; la libreria que pinta el SVG solo ve
   las fuentes del sistema. Bahnschrift en negritas es la mas parecida que trae
   Windows. */
vars['font-label'] = 'Bahnschrift';

// El componente, compilado como lo compila build-js.js.
const fuente = fs.readFileSync(path.join(RAIZ, 'ui_kits', 'TarjetaPremios.jsx'), 'utf8');
const { code } = babel.transformSync(fuente, {
  babelrc: false, configFile: false,
  presets: [['@babel/preset-react', { runtime: 'classic' }]],
});
const ctx = { React, window: { MextizzaDesignSystem_8a35ee: {} }, console };
vm.createContext(ctx);
vm.runInContext(code + '\n;globalThis.__PizzaSellos = PizzaSellos;', ctx);
const PizzaSellos = ctx.__PizzaSellos;

// Medidas que recomienda Google para la imagen ancha del pase.
const ANCHO = 1032;
const ALTO = 336;
const PIZZA = 300;
const FONDO = resolver('var(--dorado-tinte)');

async function una(llenas, brownie) {
  let svg = ReactDOMServer.renderToStaticMarkup(React.createElement(PizzaSellos, {
    llenas, nueva: false, pendiente: false, listos: { brownie, pizza: llenas >= 9 }, tam: PIZZA,
  }));
  svg = resolver(svg).replace(/font-family:Bahnschrift/g, 'font-family:Bahnschrift;font-weight:700');
  if (!/xmlns=/.test(svg)) svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  const pizza = await sharp(Buffer.from(svg), { density: 192 }).resize(PIZZA, PIZZA).png().toBuffer();
  const nombre = 'pizza-' + llenas + (brownie ? '-brownie' : '') + '.png';
  await sharp({ create: { width: ANCHO, height: ALTO, channels: 4, background: FONDO } })
    .composite([{ input: pizza, left: Math.round((ANCHO - PIZZA) / 2), top: Math.round((ALTO - PIZZA) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(SALIDA, nombre));
  return nombre;
}

(async () => {
  fs.mkdirSync(SALIDA, { recursive: true });
  const hechas = [];
  for (let n = 0; n <= 9; n++) {
    hechas.push(await una(n, false));
    hechas.push(await una(n, true));
  }
  console.log('  wallet       ' + hechas.length + ' imagenes en assets/wallet/');
})().catch((e) => { console.error(e); process.exit(1); });
