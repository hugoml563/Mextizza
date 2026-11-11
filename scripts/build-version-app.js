/* Publica app-version.json en la raiz del sitio: la app lo consulta al abrir
   para avisar cuando hay una version nueva.

   Los APK no se actualizan solos. Cuando salio la 1.9 con un parche critico,
   la 1.8 siguio instalada en los telefonos sin que nadie se enterara.

     ultima  el versionCode de android/app/build.gradle (el APK que se publica).
     minima  scripts/version-app.json. Se sube A MANO cuando una version trae un
             arreglo de seguridad: quien tenga una menor ve un aviso fijo.
             Debe quedar <= ultima, o todas las apps se verian viejas. */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const gradle = fs.readFileSync(path.join(RAIZ, 'android', 'app', 'build.gradle'), 'utf8');
const codigo = Number((gradle.match(/versionCode\s+(\d+)/) || [])[1]);
const nombre = (gradle.match(/versionName\s+"([^"]+)"/) || [])[1];
if (!codigo || !nombre) throw new Error('No encontre versionCode/versionName en android/app/build.gradle');

const { minima } = JSON.parse(fs.readFileSync(path.join(__dirname, 'version-app.json'), 'utf8'));
if (!Number.isInteger(minima) || minima > codigo) {
  throw new Error('scripts/version-app.json: minima (' + minima + ') tiene que ser un entero <= ' + codigo);
}

const salida = { ultima: codigo, ultimaNombre: nombre, minima, url: 'https://mextizza.com/app' };
fs.writeFileSync(path.join(RAIZ, 'app-version.json'), JSON.stringify(salida, null, 2) + '\n');
console.log('  app-version.json  app ' + nombre + ' (' + codigo + '), minima ' + minima);
