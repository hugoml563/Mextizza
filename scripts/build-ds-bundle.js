#!/usr/bin/env node
/*
 * Genera _ds_bundle.js: el paquete del sistema de diseno (Wordmark, Button,
 * MenuItem...) que cargan la web, la app, las fichas de components/ y las
 * plantillas de templates/ (via ds-base.js).
 *
 * Antes el paquete se armaba fuera del repo y se copiaba a mano. Ademas de los
 * componentes metia copias congeladas de ui_kits/: menu-data.js, delivery-zone.js,
 * WebSurfaces.jsx, AppScreens.jsx, etc. Esas copias se quedaron viejas (otro orden
 * de pizzas, fotos que ya no existen, el centro de la zona en otro lugar, acentos
 * rotos) y en cualquier pagina que cargara el paquete DESPUES de los archivos
 * buenos los pisaban: el Centro de Ventas mostraba Lomas Lindas a 4.3 km.
 *
 * Ahora el paquete solo lleva los componentes de components/brand y components/ui.
 * Los datos del negocio viven nada mas en ui_kits/menu-data.js y
 * ui_kits/delivery-zone.js, y cada pagina los carga por su cuenta.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const babel = require('@babel/core');

const RAIZ = path.join(__dirname, '..');
const SALIDA = path.join(RAIZ, '_ds_bundle.js');
// El nombre que leen las paginas: window.MextizzaDesignSystem_8a35ee.
const NAMESPACE = 'MextizzaDesignSystem_8a35ee';
const CARPETAS = ['components/brand', 'components/ui'];

/* Quita los import/export de ES modules: el paquete es un <script> clasico.
   - import React: React ya es global en todas las paginas.
   - import { Icon } from './Icon.jsx': se toma del ambito compartido del paquete.
   - export function X: queda como funcion y se publica al final del modulo. */
function pluginModulo(info) {
  return ({ types: t }) => ({
    visitor: {
      ImportDeclaration(p) {
        const origen = p.node.source.value;
        if (origen === 'react') { p.remove(); return; }
        if (!origen.startsWith('./') && !origen.startsWith('../')) {
          throw p.buildCodeFrameError('import externo no soportado: ' + origen);
        }
        const nombres = p.node.specifiers.map((s) => {
          if (!t.isImportSpecifier(s)) throw p.buildCodeFrameError('solo imports con nombre');
          info.importa.push(s.imported.name);
          return t.objectProperty(t.identifier(s.imported.name), t.identifier(s.local.name), false,
            s.imported.name === s.local.name);
        });
        p.replaceWith(t.variableDeclaration('const', [
          t.variableDeclarator(t.objectPattern(nombres), t.identifier('__ds_scope')),
        ]));
      },
      ExportNamedDeclaration(p) {
        const d = p.node.declaration;
        if (!d || p.node.source) throw p.buildCodeFrameError('solo "export function/const"');
        if (t.isFunctionDeclaration(d)) info.exporta.push(d.id.name);
        else if (t.isVariableDeclaration(d)) d.declarations.forEach((v) => info.exporta.push(v.id.name));
        else throw p.buildCodeFrameError('export no soportado');
        p.replaceWith(d);
      },
      ExportDefaultDeclaration(p) { throw p.buildCodeFrameError('export default no soportado'); },
    },
  });
}

function compilar(rel) {
  const abs = path.join(RAIZ, rel);
  const fuente = fs.readFileSync(abs, 'utf8');
  const info = { rel, importa: [], exporta: [] };
  const { code } = babel.transformSync(fuente, {
    filename: abs,
    babelrc: false,
    configFile: false,
    compact: false,
    presets: [['@babel/preset-react', { runtime: 'classic' }]],
    plugins: [pluginModulo(info)],
  });
  info.code = code;
  info.hash = crypto.createHash('sha256').update(fuente).digest('hex').slice(0, 12);
  return info;
}

const modulos = [];
for (const carpeta of CARPETAS) {
  for (const f of fs.readdirSync(path.join(RAIZ, carpeta)).sort()) {
    if (f.endsWith('.jsx')) modulos.push(compilar(carpeta + '/' + f));
  }
}

/* Orden: un modulo va despues de los que importa (Button despues de Icon), porque
   toma sus dependencias del ambito compartido al ejecutarse. */
const porNombre = new Map();
modulos.forEach((m) => m.exporta.forEach((n) => porNombre.set(n, m)));
const orden = [];
const visto = new Set();
function poner(m, pila = []) {
  if (visto.has(m)) return;
  if (pila.includes(m)) throw new Error('import circular: ' + pila.concat(m).map((x) => x.rel).join(' -> '));
  for (const n of m.importa) {
    const dep = porNombre.get(n);
    if (!dep) throw new Error(m.rel + ' importa ' + n + ', que ningun componente exporta');
    poner(dep, pila.concat(m));
  }
  visto.add(m);
  orden.push(m);
}
modulos.forEach((m) => poner(m));

const componentes = [];
orden.forEach((m) => m.exporta.forEach((n) => componentes.push({ name: n, sourcePath: m.rel })));
const cabecera = {
  format: 4,
  namespace: NAMESPACE,
  components: componentes,
  sourceHashes: Object.fromEntries(orden.map((m) => [m.rel, m.hash])),
  inlinedExternals: [],
  unexposedExports: [],
};

const partes = [
  '/* @ds-bundle: ' + JSON.stringify(cabecera) + ' */',
  '/* Generado por scripts/build-ds-bundle.js. No editar a mano: los cambios van en\n' +
  '   components/brand/*.jsx y components/ui/*.jsx. Este paquete solo lleva componentes;\n' +
  '   el menu y la zona de reparto viven en ui_kits/menu-data.js y ui_kits/delivery-zone.js. */',
  '(() => {',
  'const __ds_ns = (window.' + NAMESPACE + ' = window.' + NAMESPACE + ' || {});',
  'const __ds_scope = {};',
  '(__ds_ns.__errors = __ds_ns.__errors || []);',
];
for (const m of orden) {
  partes.push(
    '// ' + m.rel + '\n' +
    'try { (() => {\n' + m.code + '\n' +
    'Object.assign(__ds_scope, { ' + m.exporta.join(', ') + ' });\n' +
    '})(); } catch (e) { __ds_ns.__errors.push({ path: ' + JSON.stringify(m.rel) +
    ', error: String((e && e.message) || e) }); }'
  );
}
partes.push(componentes.map((c) => '__ds_ns.' + c.name + ' = __ds_scope.' + c.name + ';').join('\n'));
partes.push('})();\n');
const contenido = partes.join('\n\n');

/* Candados: que el paquete no vuelva a cargar datos del negocio ni a tocar window
   fuera de su espacio, y que no traiga acentos rotos (UTF-8 leido como Latin-1). */
const prohibido = [
  [/MEXTIZZA_[A-Z0-9_]+/, 'datos del negocio (MEXTIZZA_*)'],
  [/\bzona(Evaluar|DistanciaKm)\b|\bmextizzaEs2x1\b/, 'funciones de la zona o del 2x1'],
  [/Object\.assign\(\s*window\b/, 'algo publicado directo en window'],
  [/Ã[\u0080-¿]|â€/, 'acentos rotos (mojibake)'],
];
for (const [re, que] of prohibido) {
  const m = contenido.match(re);
  if (m) throw new Error('_ds_bundle.js no puede llevar ' + que + ': encontre "' + m[0] + '"');
}

fs.writeFileSync(SALIDA, contenido);
console.log('  _ds_bundle.js: ' + componentes.length + ' componentes, ' +
  Math.round(fs.statSync(SALIDA).size / 1024) + ' KB, sin datos del negocio');
