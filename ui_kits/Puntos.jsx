/* Los tres puntos de "se esta procesando", compartidos por la web y la app.

   El CSS vive en tokens/base.css porque el Centro de Ventas usa el mismo
   indicador y no tiene React. Aqui solo va el marcado.

   Lleva texto para lector de pantalla: tres puntos que se mueven no dicen nada
   a quien no los ve. */
function PuntosEnviando({ etiqueta = 'Enviando tu pedido' }) {
  return (
    <span className="mx-puntos" role="status" aria-live="polite">
      <i /><i /><i />
      <span style={{
        position: 'absolute', width: 1, height: 1, overflow: 'hidden',
        clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap',
      }}>{etiqueta}</span>
    </span>
  );
}

Object.assign(window, { PuntosEnviando });
