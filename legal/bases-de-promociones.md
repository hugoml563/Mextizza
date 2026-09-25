# Bases de Promociones — Mextizza

> **BORRADOR. No publicar sin revisión de un abogado mexicano.**
>
> A diferencia de los otros dos documentos, aquí **las reglas no son un
> supuesto**: están copiadas de lo que el sistema de verdad aplica hoy
> (`Code.gs` y `ui_kits/TarjetaPremios.jsx`). Si se cambia una promoción en el
> código, hay que cambiar este texto el mismo día.

**Última actualización:** [fecha de publicación]

---

## 2x1 de los miércoles

**Vigencia:** permanente hasta nuevo aviso. Se anunciará aquí con al menos una
semana de anticipación cualquier cambio o terminación.

**Cuándo aplica:** todos los **miércoles a partir de las 7:00 pm**, hora del
centro de México, hasta el cierre.

**En qué consiste:** al pedir dos pizzas, la de menor precio sale gratis.

**Restricciones:**

- Aplica únicamente a **pizzas**. No aplica a bebidas, postres ni complementos.
- La pizza sin costo es siempre la de **menor precio** de las dos.
- Los complementos de la pizza gratis **sí se cobran**.
- El descuento lo determina nuestro sistema con el reloj del servidor, no con
  el del dispositivo del cliente.
- No es acumulable con el premio de la tarjeta de recompensas en la misma
  pizza.

## Tarjeta de recompensas

**Vigencia:** permanente hasta nuevo aviso.

**Cómo se acumula:** se registra **un sello por cada día en que recibas un
pedido entregado** que incluya al menos una pizza pagada.

- Un solo sello por día, sin importar cuántos pedidos hagas ese día.
- El sello se registra **cuando el pedido se marca como entregado**, no cuando
  se hace. Un pedido cancelado no suma.
- La tarjeta se identifica con tu número de teléfono.

**Cómo se cobra un premio:**

- Los sellos se acumulan con tu teléfono, tengas cuenta o no.
- Para cobrar un premio en el sitio o en la aplicación necesitas **entrar con
  tu cuenta** y que tu teléfono esté **ligado a ella**.
- Si haces un pedido con tu cuenta abierta, el teléfono de ese pedido se liga
  a tu cuenta cuando te lo entregamos, siempre que no esté ligado a otra cuenta
  y tu cuenta no tenga ya otro teléfono.
- Si pediste sin cuenta, puedes ligarlo una sola vez comprobando que es tuyo
  con el folio de un pedido que ya te entregamos.
- Un teléfono solo puede estar ligado a una cuenta, y una cuenta a un teléfono.
  Si cambiaste de número o el tuyo aparece ligado a otra cuenta, escríbenos.
- En pedidos por WhatsApp, el premio lo aplicamos nosotros desde la cocina.

**Premios:**

| Sello | Premio |
| :---- | :---- |
| 4 | Un brownie sin costo |
| 9 | Una Pizza Traviesa sin costo |

**Restricciones:**

- Al llegar al sello 9 y canjear la pizza, la tarjeta vuelve a empezar.
- El brownie del sello 4, si no lo canjeas, se conserva para un pedido
  posterior.
- Los premios **no son transferibles** ni canjeables por dinero.
- El premio se aplica sobre un pedido; no se entrega por separado.
- Nuestro sistema valida el premio del lado del servidor. Si la tarjeta no
  tiene el premio disponible, el pedido se cobra completo.

## Reglas comunes

- Las promociones aplican únicamente dentro de nuestra zona de entrega y
  horario de servicio.
- Nos reservamos el derecho de modificar o terminar cualquier promoción,
  anunciándolo en esta página. **Los premios ya acumulados se respetan.**
- Si detectamos uso indebido —tarjetas creadas con teléfonos falsos, pedidos
  hechos únicamente para acumular y luego cancelados— podemos cancelar la
  tarjeta, avisando al titular.
- Cualquier duda: mextizza@gmail.com o WhatsApp.

---

## Notas para Hugo (borrar antes de publicar)

**Esta es la página con más exposición real ante PROFECO de las tres**, y
también la más fácil de cumplir, porque las reglas ya están implementadas y
validadas del lado del servidor. Lo que PROFECO sanciona es anunciar una
promoción y no honrarla, o cambiar las condiciones sin avisar.

Dos cosas que conviene decidir antes de publicar:

1. **La vigencia queda "permanente hasta nuevo aviso"**, por decisión de Hugo.
   Apagar o cambiar una promoción exige entonces anunciarlo aquí con
   anticipación, y los premios ya acumulados se respetan siempre. Que el
   abogado confirme cuánta anticipación basta.
2. **La cláusula de uso indebido debería existir antes de necesitarla.**
   Publicarla después de cancelarle la tarjeta a alguien no sirve de nada.

Hay un tercer punto, más de sistema que legal: hoy el código es la única fuente
de verdad de estas reglas, y este documento es una copia a mano. Se pueden
separar sin que nadie se entere. Si te interesa, se puede hacer que
`scripts/build-js.js` compare el texto publicado contra las constantes y
detenga el build si dejan de coincidir, igual que ya lo hace con el horario, el
2x1 y los premios entre las dos capas.
