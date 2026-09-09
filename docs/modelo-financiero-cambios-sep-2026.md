# Mextizza — Cambios al modelo de negocio para reflejar en el plan financiero

**Fecha:** 7 de septiembre de 2026
**Archivo destino:** `Mextizza plan financiero.xlsx`
**Para:** el asistente que trabaje dentro de Excel

---

## Cómo usar este documento

Describe las reglas de negocio que se implementaron en el sistema de pedidos **después** de que se construyó el plan financiero, y que hoy **no están reflejadas en el modelo**.

Tres advertencias sobre cómo leerlo:

1. **Las cifras marcadas como VERIFICADAS** se leyeron directamente del archivo o del código en producción. Se pueden usar tal cual.
2. **Las cifras marcadas como APROXIMADAS** se calcularon usando el food cost promedio del modelo (28.9%) aplicado parejo a todas las pizzas. **El modelo tiene el costo BOM real de cada pizza y no es parejo** — la Provola es la de food cost más alto, la Newyork la más baja. Recalcular con los valores reales del archivo, no usar estas aproximaciones.
3. **Quien escribió este documento no pudo leer las celdas calculadas del archivo.** Se leyó a través de un conversor que no soporta XLOOKUP y devolvía errores en todas las celdas que dependen de esa función. Los valores de captura (Lista Maestra, precios, OPEX) sí se leyeron bien.

**Regla general: siempre que este documento dé un número y el archivo tenga el suyo, gana el archivo.**

---

## 1. Estado del modelo

El modelo está **sano**. Se verificó abierto en Microsoft 365 el 7 de septiembre: todas las fórmulas corren, no hay errores.

Existe una nota vieja en el plan de negocios que afirmaba que las hojas BOM Recetas, Supuestos, OPEX, Punto de Equilibrio y Flujo de Caja tenían errores `#NAME?`. **Esa nota es falsa** y ya se eliminó de los documentos actualizados. Era un artefacto de leer el archivo con un conversor sin soporte para XLOOKUP.

### Dato confirmado

**CAPEX = $55,432.** Confirmado por Hugo el 7 de septiembre. Corresponde a una inversión adicional posterior al cálculo de julio. Cualquier referencia a $49,831.58 está obsoleta.

---

## 2. Menú vigente

Nueve pizzas y cuatro complementos. **VERIFICADO** contra el código en producción y contra la hoja Precios de Menú.

| Producto | id interno | Precio |
| :---- | :---- | ----: |
| Pizza Serranita | serranita | $229 |
| Pizza Provola | provola | $229 |
| Pizza Combinada | combinada | $229 |
| Pizza Cochinita | cochinita | $229 |
| Pizza Chisi | chisi | $219 |
| Pizza Newyork | newyork | $199 |
| Pizza Traviesa | traviesa | $199 |
| Pizza Aloha | aloha | $189 |
| Pizza Roni | roni | $189 |
| Brownie | chocolatoso | $40 |
| Refresco Coca-Cola | refresco-coca | $35 |
| Refresco Sprite | refresco-sprite | $35 |
| Agua Mineral | agua | $35 |

Precio promedio por pizza: **$212.33**.

**Nota de nomenclatura:** en el modelo la rotativa aparece como "PIZZA MEXTIZZA". En el sistema y en la carta se llama **Pizza Cochinita**. Es el mismo producto. Conviene alinear el nombre en el modelo.

**Distinción que el modelo debe respetar:** las nueve primeras son **pizzas**. Brownie, refrescos y agua son **"Para cerrar"**. Varias reglas de promoción dependen de esta distinción.

---

## 3. Reglas de negocio nuevas

Las tres siguientes están **implementadas y corriendo en producción**. El modelo no las conoce.

### 3.1 Tarjeta de lealtad

Programa de sellos por teléfono del cliente.

**Cómo se gana un sello:**

- Un sello por **día calendario distinto** con pedido, no por pedido. Dos pedidos el mismo día valen **un** sello.
- El pedido debe incluir **al menos una pizza que se esté cobrando**. Un pedido de solo bebidas o solo postre no da sello.
- El sello se otorga **cuando el pedido se marca como entregado**, no cuando se hace. Un pedido cancelado o que nunca avanzó **no da sello**.
- El día que cuenta es el de la **entrega**, en hora de Ciudad de México.

**Premios:**

| Día del ciclo | Premio | Precio de menú |
| ----: | :---- | ----: |
| 4 | Brownie | $40 |
| 9 | Pizza Traviesa | $199 |

**Mecánica del ciclo:**

- Al canjear la Traviesa del día 9, el contador **resta 9**, no vuelve a cero. Quien acumuló 11 días queda en 2. Los días extra no se pierden.
- Un brownie que quedó sin reclamar al cerrar el ciclo **se hereda** a la tarjeta siguiente y sigue disponible.
- Los premios se reservan mientras el pedido va en camino, para que no se puedan canjear dos veces.

**Para modelar:** el costo por ciclo de 9 días es el **costo BOM del brownie más el costo BOM de la Traviesa** — tomar ambos de la hoja BOM Recetas. En valor de menú son $239, pero el costo real para el negocio es el de insumos, más el costo de oportunidad si el cliente los habría comprado de todos modos. Conviene modelar los dos escenarios.

### 3.2 Miércoles de 2x1

- **Cuándo:** miércoles, desde las **19:00 hora de Ciudad de México**, hasta el cierre (23:00).
- **Qué regala:** de dos pizzas en el mismo pedido, **la más barata sale gratis**.
- **Postres y bebidas no cuentan** como pizza para disparar la promoción.
- **Una promoción por pedido.** Si el pedido trae cuatro pizzas, se regala una, no dos.
- **No se acumula con la tarjeta.** Si el cliente tiene premio disponible y además es miércoles, se aplica **solo el de mayor valor**.
- Una línea con cantidad 2 del mismo producto **sí dispara** la promoción.

**Cómo queda registrado en la operación:** la línea regalada conserva su `precio_unit` pero su `importe` es 0, y se marca con el motivo de la promoción. Así la cocina la ve y la prepara, pero no suma al corte de ventas.

### 3.3 Recoger en cocina

**Construido pero APAGADO.** No modelarlo como activo; dejarlo como escenario.

- Descuento de **$30 por pedido**, fijo, no por pizza.
- Solo aplica si el pedido trae **al menos una pizza cobrada**.
- **Sí se acumula** con el 2x1 y con la tarjeta.
- Cuando esté activo, ese pedido **no consume reparto**.

### 3.4 Horario de servicio

**VERIFICADO** y validado del lado del servidor: **miércoles a domingo, 16:00 a 23:00** hora de Ciudad de México. Fuera de ese horario el sistema rechaza pedidos.

Son **5 días de servicio por semana**, no 7. Verificar que el modelo use 5.

---

## 4. Datos de costo verificados

Leídos directamente del archivo, hoja OPEX, bloque "Costos variables por orden":

| Concepto | Valor | Nota |
| :---- | ----: | :---- |
| Entrega, "mandadito" por orden | **$40** | Por pedido, no por pizza |
| Empaque por orden | $15 | **Ya incluido dentro del BOM.** La celda es solo referencia; no sumarlo aparte |
| Comisión de apps | $30 | Ver el problema abajo |

### Problema detectado: la comisión de apps

La celda está descrita como *"ponderada por % de canal no-directo"* pero tiene un valor fijo de **$30 por orden**.

**Mextizza vende hoy 100% por canal directo.** No opera en UberEats, Rappi ni DiDi Food. Las apps de terceros son Fase 2 condicionada y no se han activado.

Esto significa que el modelo carga $30 por orden que **hoy no existen**, y por lo tanto **subestima el margen de contribución real**.

**Ajuste sugerido:** ligar esa celda al porcentaje real de canal no-directo, con una celda de captura para ese porcentaje. Hoy sería 0% y el costo $0. Cuando se active la Fase 2, se captura el mix y el modelo se ajusta solo.

Con ese ajuste, el margen de contribución sube de ~50% a ~59%.

---

## 5. Trabajo pedido: hoja nueva "Promociones"

Construir una hoja que cuantifique el efecto de la tarjeta y del 2x1 sobre el margen, y que alimente de vuelta a Supuestos.

Respetar el código de colores del archivo: **azul = captura**, **verde = fórmula que jala de otra hoja**, negro = calculado.

### Bloque 1 — Parámetros (captura, azul)

| Parámetro | Valor sugerido | Nota |
| :---- | ----: | :---- |
| Pedidos con 2x1 por miércoles | 3 | Estimado, ajustable |
| Miércoles por mes | 4.3 | 52 semanas / 12 |
| % de clientes que alcanzan el día 4 | 40% | Estimado |
| % de clientes que alcanzan el día 9 | 15% | Estimado |
| % de canjes que son incrementales | 50% | Cuánto del premio el cliente NO habría comprado de todos modos |
| Días del ciclo de tarjeta | 9 | Fijo por diseño |

### Bloque 2 — Contribución del 2x1 por par de pizzas

Matriz con las 9 pizzas en filas y columnas. Para cada par:

```
Ingreso        = MAX(precio_A, precio_B)          ' la más barata es gratis
Costo insumos  = costo_BOM_A + costo_BOM_B        ' se producen las dos
Costo variable = Costo insumos + reparto + comisión_apps_ajustada
Contribución   = Ingreso - Costo variable
Contribución % = Contribución / Ingreso
```

Los costos BOM deben jalarse de la hoja **BOM Recetas**, tabla "Pizzas del menú vigente", columna *Costo BOM (MXN)*. **No usar un promedio**: el food cost real varía por pizza.

Marcar en la matriz los pares cuya contribución quede por debajo de un umbral de captura (sugerido: 25%), para saber cuáles convendría excluir de la promoción.

**Aproximación de referencia** (con food cost promedio de 28.9% y reparto $40, **sin** comisión de apps). Sirve solo para validar que el orden de magnitud del cálculo sea correcto:

| Par | Ingreso | Contribución aprox. | % aprox. |
| :---- | ----: | ----: | ----: |
| Pedido normal, ticket $332 | $332 | $196 | 59% |
| 229 + 189 | $229 | $68 | 30% |
| 219 + 199 | $219 | $58 | 27% |
| 229 + 229 | $229 | $57 | 25% |
| 189 + 189 | $189 | $40 | 21% |

Lectura: el 2x1 **no deja el pedido en pérdida, pero le parte el margen a la mitad**. Los números exactos por par saldrán del BOM real.

### Bloque 3 — Costo de la tarjeta de lealtad

```
Costo insumo por ciclo   = costo_BOM_brownie + costo_BOM_traviesa
Valor de menú por ciclo  = 40 + 199 = 239
Costo efectivo por ciclo = Costo insumo + (Valor menú - Costo insumo) × (1 - % incremental)
Costo por pedido         = Costo efectivo por ciclo / 9
Impacto en margen (pp)   = Costo por pedido / ticket promedio
```

### Bloque 4 — Impacto mensual consolidado

```
Pedidos totales al mes        ' jalar de Supuestos
Pedidos con 2x1 al mes        = pedidos por miércoles × miércoles al mes
Margen perdido por 2x1        = pedidos con 2x1 × (contribución normal - contribución 2x1 promedio)
Margen perdido por tarjeta    = pedidos totales × costo por pedido de tarjeta
Margen de contribución ajustado = margen actual - ambos efectos
```

### Bloque 5 — Devolver a Supuestos

Agregar en la hoja Supuestos una línea de **"Margen de contribución ajustado por promociones"** que jale el resultado del Bloque 4, y usarla en Punto de Equilibrio y Flujo de Caja en lugar del margen sin promociones.

Ese es el punto de todo el ejercicio: que el punto de equilibrio y el flujo reflejen lo que de verdad se está regalando.

---

## 6. Correcciones a hojas existentes

### 6.1 Nota obsoleta en la guía

La hoja de instrucciones, sección "7. Problemas conocidos", dice:

> *"El sistema de pedidos cobra precios viejos. Las líneas importadas traen Roni $210, Serranita $245, Aloha $180, y los nombres 'Soda Italiana' y 'Chocolatoso'."*

**Ya no aplica.** Era cierto cuando se escribió: corresponde a los pedidos de prueba MX-0001 a MX-0014. Desde entonces el servidor fija los precios contra su propio catálogo y el cliente no puede dictarlos. Del MX-0015 en adelante todos los precios son correctos.

Se puede eliminar o marcar como resuelta.

### 6.2 Nombre de la rotativa

"PIZZA MEXTIZZA" en el modelo es **Pizza Cochinita** en la carta. Alinear.

### 6.3 Comisión de apps

Ver Sección 4. Ligarla al mix real de canal.

---

## 7. Contexto importante sobre los datos

**No hay ventas reales todavía.** Al 7 de septiembre de 2026, la base de operación tiene 71 registros y **todos son pruebas técnicas, todos cancelados**. El negocio no ha tomado un pedido de un cliente real.

Esto significa que **ningún supuesto del modelo puede validarse todavía** contra la realidad: ni el ticket promedio, ni la rampa de adopción, ni los pedidos por día, ni la mezcla de productos.

**No usar esos 71 registros como datos de venta.** Cuando existan unas 30 ventas reales, conviene recalcular ticket promedio, mezcla y food cost real contra lo modelado.

---

## 8. Qué NO tocar

- **Las recetas y gramajes del BOM.** Son estimados razonables migrados del escandallo original, pero no han sido medidos con Ricardo. Cambiarlos sin medir empeora el modelo.
- **La Lista Maestra de costos de insumos**, salvo que haya cotizaciones reales de proveedor. Hoy son estimados de mercado.
- **La hoja "Escandallo Original".** Es histórica.
- **Los precios de carta.** Están alineados con el sistema de pedidos. Si se cambian aquí sin cambiarlos en el sistema, el modelo y la caja dirán cosas distintas.

---

## Resumen de lo que se pide

1. Crear la hoja **Promociones** con los cuatro bloques de la Sección 5.
2. Conectar su resultado a **Supuestos**, y de ahí a Punto de Equilibrio y Flujo de Caja.
3. Corregir la **comisión de apps** para que dependa del mix real de canal.
4. Actualizar el **CAPEX a $55,432** donde aplique.
5. Marcar como resuelta la nota obsoleta de precios viejos.
6. Alinear el nombre **Pizza Mextizza → Pizza Cochinita**.
