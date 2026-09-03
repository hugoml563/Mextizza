#!/usr/bin/env node
/*
 * Reconstruye el APK publicado en assets/app/mextizza.apk.
 *
 * El proceso no estaba escrito en ningun lado: se hacia a mano, y por eso el
 * APK se quedo atras del sitio mas de una vez. Aqui va completo y en un solo
 * comando: npm run build:apk
 *
 * La firma es lo delicado. Android identifica una app por su certificado, no
 * por su nombre: un APK firmado con otra llave NO se instala encima del que ya
 * tiene la gente (INSTALL_FAILED_UPDATE_INCOMPATIBLE), y uno sin firmar no se
 * instala en absoluto. Por eso este script se niega a publicar si la llave no
 * esta o si no es la de siempre, en vez de dejar un archivo que rompe la
 * actualizacion de todos los que ya descargaron la app.
 *
 * La llave vive fuera del repo (android/keystore.properties y
 * android/mextizza-release.keystore, ambos en .gitignore), asi que esto solo
 * corre en la maquina que la tiene.
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const ANDROID = path.join(RAIZ, 'android');
const PUBLICADO = path.join(RAIZ, 'assets', 'app', 'mextizza.apk');

// Huella del certificado con el que se firmo el APK que ya trae la gente
// instalada (CN=Mextizza, RSA 4096). Si cambia, la actualizacion se rompe.
const CERT = '9159176deacea0bd77675783151ee06828ce57fdc258e02654fbd4499fd12ca9';

function paso(titulo) { console.log('\n· ' + titulo); }
// En Windows npm es npm.cmd y Gradle es gradlew.bat. Node 20 dejo de ejecutar
// .cmd y .bat sin shell (CVE-2024-27980), asi que ahi hace falta shell: true.
// Los argumentos son literales fijos, no entrada de usuario, asi que es seguro.
const WIN = process.platform === 'win32';
function corre(cmd, args, opts = {}) {
  const bin = WIN && cmd === 'npm' ? 'npm.cmd' : cmd;
  return execFileSync(bin, args, {
    cwd: RAIZ, stdio: 'inherit', shell: WIN, ...opts,
  });
}

if (!fs.existsSync(path.join(ANDROID, 'keystore.properties'))) {
  console.error(
    '\nFalta android/keystore.properties: sin la llave de firma el APK que sale\n' +
    'no se puede instalar, y firmado con otra llave no se instala encima del que\n' +
    'ya tiene la gente. Corre esto en la maquina que guarda la llave.\n');
  process.exit(1);
}

paso('Sitio y assets de la app (build:js + build-mobile + cap sync)');
corre('npm', ['run', 'cap:sync']);

paso('APK de release');
// Ruta absoluta a proposito: cmd de Windows no busca ejecutables en el
// directorio actual, asi que 'gradlew.bat' a secas no se encuentra aunque
// cwd sea android/.
const GRADLE = WIN ? path.join(ANDROID, 'gradlew.bat') : 'sh';
const TAREA = WIN ? ['assembleRelease', '--no-daemon']
                  : ['gradlew', 'assembleRelease', '--no-daemon'];

// En Windows, Gradle falla seguido con 'Unable to delete directory' sobre sus
// propios intermedios: algo del sistema (indexador, antivirus) mantiene un
// archivo abierto. La salida es borrar app/build y repetir. Se hace una vez y
// automatico, porque a mano es la interrupcion mas comun de esta compilacion.
try {
  corre(GRADLE, TAREA, { cwd: ANDROID });
} catch (e) {
  console.log('');
  console.log('  Gradle no pudo limpiar sus intermedios. Borro app/build y repito.');
  fs.rmSync(path.join(ANDROID, 'app', 'build'), { recursive: true, force: true });
  corre(GRADLE, TAREA, { cwd: ANDROID });
}

const salida = path.join(ANDROID, 'app/build/outputs/apk/release/app-release.apk');
if (!fs.existsSync(salida)) {
  console.error('\nGradle no produjo app-release.apk (¿la firma fallo?).\n');
  process.exit(1);
}

paso('Verificando la firma antes de publicar');
const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
// En Windows la herramienta es apksigner.bat; en Linux y macOS no lleva
// extension. Se prueban ambas para que el mismo script sirva en las tres.
const NOMBRES = WIN ? ['apksigner.bat', 'apksigner'] : ['apksigner'];
const apksigner = sdk && fs.readdirSync(path.join(sdk, 'build-tools')).sort().reverse()
  .flatMap((v) => NOMBRES.map((n) => path.join(sdk, 'build-tools', v, n)))
  .find((p) => fs.existsSync(p));
if (!apksigner) {
  console.error('\nNo encontre apksigner (define ANDROID_HOME). Sin verificar la\n' +
    'firma no publico: revisala a mano antes de copiar el APK.\n');
  process.exit(1);
}
const info = execFileSync(apksigner, ['verify', '--print-certs', salida],
  { encoding: 'utf8', shell: WIN });
const firma = (info.match(/certificate SHA-256 digest: ([0-9a-f]+)/) || [])[1];
if (firma !== CERT) {
  console.error(
    '\nEl APK quedo firmado con otra llave:\n' +
    '  esperada: ' + CERT + '\n' +
    '  obtenida: ' + (firma || '(ninguna)') + '\n\n' +
    'Publicarlo dejaria a todos los que ya instalaron la app sin poder\n' +
    'actualizar: tendrian que desinstalarla primero. No lo copio.\n');
  process.exit(1);
}

fs.copyFileSync(salida, PUBLICADO);
const mb = (fs.statSync(PUBLICADO).size / 1024 / 1024).toFixed(1);
console.log('\n  assets/app/mextizza.apk actualizado — ' + mb + ' MB, firma correcta.\n');
