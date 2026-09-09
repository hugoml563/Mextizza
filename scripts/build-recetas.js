#!/usr/bin/env node
/*
 * Genera los archivos de siembra del sistema de inventarios.
 *
 *   node scripts/build-recetas.js
 *
 * Escribe dos CSV en siembra-inventario/ para pegar en las hojas nuevas de
 * "Mextizza — Operacion":
 *
 *   insumos.csv   catalogo de insumos crudos y preparados
 *   recetas.csv   cuanto de cada componente lleva cada producto
 *
 * ESTO SE CORRE UNA VEZ. Despues, la hoja `recetas` es la fuente de verdad —
 * este archivo solo existe para no capturar 90 renglones a mano, y para dejar
 * asentado de donde salieron.
 *
 * Los gramajes se transcribieron del BOM del Excel "Mextizza plan financiero".
 * COTEJARLOS CONTRA EL EXCEL antes de operar con ellos: se leyeron a traves de
 * un conversor y una cifra mal copiada se vuelve merma fantasma para siempre.
 *
 * Aviso mayor: los gramajes del BOM son estimados migrados del escandallo
 * original y nunca se midieron con Ricardo. El inventario hereda ese error.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const DESTINO = path.join(RAIZ, 'siembra-inventario');

/* ------------------------------------------------------------- insumos ---
   id · nombre · uom · categoria · tipo · costo · minimo · rinde
   El costo es el de la Lista Maestra del Excel y solo siembra el promedio
   inicial: de ahi en adelante lo mueve cada compra. */
const CRUDOS = [
  ['harina-fuerza',    'Harina de fuerza',                    'Kg',  'Masa',      20.00, 5],
  ['agua',             'Agua',                                'L',   'Masa',       0.06, 20],
  ['levadura',         'Levadura instantánea',                'Kg',  'Masa',      70.00, 0.1],
  ['azucar',           'Azúcar',                              'Kg',  'Masa',      30.00, 1],
  ['sal',              'Sal',                                 'Kg',  'Masa',      25.00, 1],
  ['aoev',             'Aceite de oliva extra virgen',        'L',   'Masa',     123.00, 1],
  ['jitomate',         'Jitomate',                            'Kg',  'Salsa',     25.00, 3],
  ['cebolla',          'Cebolla',                             'Kg',  'Salsa',     30.00, 2],
  ['ajo',              'Ajo',                                 'Kg',  'Salsa',    180.00, 0.2],
  ['hierbas',          'Hierbas italianas',                   'Kg',  'Salsa',    300.00, 0.05],
  ['pimienta',         'Pimienta negra molida',               'Kg',  'Salsa',    220.00, 0.05],
  ['pasta-jitomate',   'Pasta de jitomate',                   'Kg',  'Salsa',     60.00, 0.5],
  ['queso-monterrey',  'Queso monterrey',                     'Kg',  'Queso',    120.00, 3],
  ['queso-provolone',  'Queso provolone',                     'Kg',  'Queso',    339.00, 1],
  ['queso-parmesano',  'Queso parmesano',                     'Kg',  'Queso',    220.00, 0.5],
  ['queso-gorgonzola', 'Queso gorgonzola',                    'Kg',  'Queso',    315.00, 0.3],
  ['peperoni',         'Peperoni',                            'Kg',  'Carne',    305.00, 1],
  ['jamon',            'Jamón',                               'Kg',  'Carne',    147.00, 1],
  ['jamon-serrano',    'Jamón serrano',                       'Kg',  'Carne',    587.00, 0.3],
  ['cochinita',        'Cochinita pibil preparada',           'Kg',  'Carne',    350.00, 1],
  ['pina',             'Piña',                                'Kg',  'Vegetal',  125.00, 1],
  ['champinones',      'Champiñones',                         'Kg',  'Vegetal',  100.00, 0.5],
  ['pimiento-verde',   'Pimiento verde',                      'Kg',  'Vegetal',   45.00, 0.5],
  ['arugula',          'Arúgula',                             'Kg',  'Vegetal',  270.00, 0.2],
  ['morada',           'Cebolla morada encurtida',            'Kg',  'Vegetal',   40.00, 0.3],
  ['miel',             'Miel',                                'Kg',  'Otro',     162.00, 0.3],
  ['macha',            'Salsa macha',                         'Kg',  'Otro',     110.00, 0.2],
  ['habanero',         'Salsa habanero',                      'Kg',  'Otro',      70.00, 0.2],
  ['crema',            'Crema para cocinar',                  'L',   'Otro',      70.00, 0.5],
  ['vodka',            'Vodka',                               'L',   'Otro',     250.00, 0.3],
  ['brownie-insumo',   'Brownie preparado',                   'Kg',  'Postre',   110.00, 0.5],
  ['refresco-pza',     'Refresco 600 ml',                     'Pza', 'Bebida',    16.00, 12],
  ['agua-mineral-pza', 'Agua mineral 355 ml',                 'Pza', 'Bebida',     8.00, 12],
  ['caja-kraft',       'Caja kraft',                          'Pza', 'Empaque',    7.00, 30],
  ['sticker',          'Sticker Mextizza',                    'Pza', 'Empaque',    1.50, 50],
];

/* Preparados: se hacen por lote y se almacenan. NO se explotan al vender —
   son stock por derecho propio. `rinde` es cuantas porciones deja un lote.

   La masa tarda 48 HORAS en fermentar. Por eso se controla aparte: tener
   harina no es tener masa, y esa diferencia es la que decide si hoy se puede
   vender o no. */
const PREPARADOS = [
  ['masa-base',    'Masa base NY 48h',           'Bola',    'Preparado', 4.5, 9],
  ['salsa-tomate', 'Salsa de tomate artesanal',  'Porción', 'Preparado', 20,  20],
];

/* ------------------------------------------------------------- recetas ---
   Todas las pizzas comparten masa, salsa y empaque. Se declara una vez. */
const BASE_PIZZA = [
  ['masa-base', 1],
  ['salsa-tomate', 1],
  ['caja-kraft', 1],
  ['sticker', 1],
];

const PIZZAS = {
  roni:      [['peperoni', 0.070], ['queso-monterrey', 0.120]],
  aloha:     [['jamon', 0.070], ['pina', 0.080], ['queso-monterrey', 0.120]],
  newyork:   [['crema', 0.050], ['vodka', 0.020], ['queso-monterrey', 0.150]],
  provola:   [['queso-provolone', 0.120], ['queso-monterrey', 0.120]],
  chisi:     [['queso-provolone', 0.060], ['queso-parmesano', 0.020],
              ['queso-gorgonzola', 0.030], ['queso-monterrey', 0.120]],
  combinada: [['jamon', 0.060], ['peperoni', 0.035], ['champinones', 0.040],
              ['pimiento-verde', 0.060], ['cebolla', 0.020], ['queso-monterrey', 0.120]],
  traviesa:  [['peperoni', 0.070], ['queso-monterrey', 0.120], ['miel', 0.020],
              ['macha', 0.010]],
  serranita: [['jamon-serrano', 0.025], ['queso-parmesano', 0.020], ['arugula', 0.010],
              ['queso-monterrey', 0.120]],
  cochinita: [['cochinita', 0.120], ['queso-monterrey', 0.150], ['morada', 0.030],
              ['habanero', 0.010]],
};

/* La Newyork lleva salsa a la vodka: la crema y el vodka van sobre la salsa
   base, no en lugar de ella. Por eso conserva salsa-tomate. */

// Postres y bebidas: el producto ES el insumo, sin transformacion.
const OTROS = {
  chocolatoso:      [['brownie-insumo', 0.080]],
  'refresco-coca':  [['refresco-pza', 1]],
  'refresco-sprite':[['refresco-pza', 1]],
  agua:             [['agua-mineral-pza', 1]],
};

/* Complementos: cada uno gasta un solo insumo. Los ids son los del menu
   (ui_kits/menu-data.js), no los nombres del Excel, para que el backflush
   pueda buscarlos directo con lo que trae el pedido. */
const COMPLEMENTOS = {
  monterrey:   [['queso-monterrey', 0.060]],
  provolone:   [['queso-provolone', 0.040]],
  parmesano:   [['queso-parmesano', 0.020]],
  gorgonzola:  [['queso-gorgonzola', 0.025]],
  peperoni:    [['peperoni', 0.035]],
  jamon:       [['jamon', 0.035]],
  serrano:     [['jamon-serrano', 0.020]],
  champinones: [['champinones', 0.040]],
  pina:        [['pina', 0.040]],
  arugula:     [['arugula', 0.010]],
  morada:      [['morada', 0.025]],
  miel:        [['miel', 0.020]],
  macha:       [['macha', 0.010]],
  habanero:    [['habanero', 0.010]],
  aoev:        [['aoev', 0.010]],
};

// Los lotes: lo unico que se explota, y solo al producirlos.
const LOTES = {
  'masa-base': [['harina-fuerza', 1.000], ['agua', 0.600], ['levadura', 0.002],
                ['azucar', 0.001], ['sal', 0.022], ['aoev', 0.050]],
  'salsa-tomate': [['jitomate', 1.100], ['cebolla', 0.200], ['ajo', 0.020],
                   ['aoev', 0.150], ['hierbas', 0.005], ['sal', 0.020],
                   ['pimienta', 0.005], ['azucar', 0.010], ['pasta-jitomate', 0.220]],
};

// --------------------------------------------------------------- salida ---
const csv = (filas) => filas.map((f) => f.map((c) => {
  const s = String(c);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}).join(',')).join('\n');

function generar() {
  const insumos = [['id', 'nombre', 'uom', 'categoria', 'tipo', 'costo_promedio',
                    'stock', 'stock_minimo', 'rinde', 'activo']];
  for (const [id, nombre, uom, cat, costo, min] of CRUDOS) {
    insumos.push([id, nombre, uom, cat, 'crudo', costo, 0, min, '', 'si']);
  }
  for (const [id, nombre, uom, cat, rinde, min] of PREPARADOS) {
    insumos.push([id, nombre, uom, cat, 'preparado', 0, 0, min, rinde, 'si']);
  }

  const recetas = [['producto_id', 'componente_id', 'cantidad', 'nota']];
  const agregar = (producto, comps, nota) => {
    for (const [comp, cant] of comps) recetas.push([producto, comp, cant, nota]);
  };
  for (const [id, comps] of Object.entries(PIZZAS)) {
    agregar(id, comps.concat(BASE_PIZZA), 'pizza');
  }
  for (const [id, comps] of Object.entries(OTROS)) agregar(id, comps, 'postre/bebida');
  for (const [id, comps] of Object.entries(COMPLEMENTOS)) agregar(id, comps, 'complemento');
  for (const [id, comps] of Object.entries(LOTES)) agregar(id, comps, 'lote');

  /* El BOM no es adorno. Sin el, Sheets y varios editores leen el archivo como
     Latin-1 y "Jamon" con acento llega a la hoja como "JamA3n". Los ids son ASCII
     y la logica no se entera, pero Ricardo si: ve los nombres rotos en la tablet. */
  const BOM = '﻿';
  fs.mkdirSync(DESTINO, { recursive: true });
  fs.writeFileSync(path.join(DESTINO, 'insumos.csv'), BOM + csv(insumos), 'utf8');
  fs.writeFileSync(path.join(DESTINO, 'recetas.csv'), BOM + csv(recetas), 'utf8');

  // Que ningun componente apunte a un insumo que no existe: un id mal escrito
  // se volveria un descuento silencioso que nunca ocurre.
  const conocidos = new Set(insumos.slice(1).map((f) => f[0]));
  const huerfanos = recetas.slice(1)
    .filter((f) => !conocidos.has(f[1]))
    .map((f) => f[0] + ' -> ' + f[1]);
  if (huerfanos.length) {
    throw new Error('Componentes que no existen en el catalogo:\n    ' + huerfanos.join('\n    '));
  }

  const pizzas = Object.keys(PIZZAS).length;
  console.log('\n  insumos.csv   ' + (insumos.length - 1) + ' insumos (' +
    CRUDOS.length + ' crudos, ' + PREPARADOS.length + ' preparados)');
  console.log('  recetas.csv   ' + (recetas.length - 1) + ' renglones · ' +
    pizzas + ' pizzas, ' + Object.keys(COMPLEMENTOS).length + ' complementos, ' +
    Object.keys(LOTES).length + ' lotes');
  console.log('\n  Escritos en siembra-inventario/');
  console.log('  COTEJAR contra el BOM del Excel antes de operar con ellos.\n');
}

generar();
