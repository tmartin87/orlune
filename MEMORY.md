# Contexto de Orlune

## Estado al preparar el commit — 1 de octubre de 2026

Esta actualización sustituye las notas anteriores que indicaban que la animación de entrada y las imágenes del Hero aún no estaban implementadas.

### Implementado y confirmado por el usuario

- Motion en el editor: entrada suave de bloques, salida al eliminar mediante AnimatePresence y animación de posición al reordenar. Se utiliza useReducedMotion y AnimatePresence con initial={false}.
- El esquema compartido del Hero incluye imageUrl e imageAlt opcionales. imageUrl admite HTTP/HTTPS o cadena vacía; los bloques antiguos sin imagen siguen siendo válidos.
- Los tipos HeroBlock, CtaBlock y LandingBlock del frontend se importan/reexportan desde @orlune/shared, eliminando las definiciones duplicadas del archivo types/landing-block.ts.
- PropertiesPanel permite editar la URL y la descripción de la imagen únicamente en bloques Hero.
- BlockRenderer muestra la imagen del Hero con proporción 16:9 y object-cover, utilizando imageAlt como texto alternativo.
- El usuario confirmó el funcionamiento de las imágenes, su guardado y su visualización en la versión pública tras publicar.
- El usuario aportó compilaciones correctas del frontend. El aviso de chunks superiores a 500 kB sigue pendiente de revisión antes del despliegue.
- La verificación funcional ha sido realizada por el usuario; el asistente sigue sin poder ejecutar comandos por el fallo de inicialización de la terminal.

### Próximo paso

- Implementar subida de imágenes desde el ordenador: selector de archivo, almacenamiento externo y guardado de la URL resultante en imageUrl.
- Todavía no hay proveedor de almacenamiento elegido ni integración de subida implementada. Comparar las condiciones actuales de opciones gratuitas antes de elegir.
- Las imágenes por URL ya funcionan y serán la base de la subida. Los enlaces de destino de botones y otras opciones visuales siguen pendientes.
- El despliegue y las animaciones GSAP de la landing/preview siguen pendientes.

### Git y cierre de este avance

- El usuario ha decidido hacer commit ahora, antes de comenzar la integración de subida de imágenes, en lugar de esperar al final de toda la sesión.
- El asistente actualiza únicamente este documento por petición expresa. El usuario ejecutará el commit.
- No se ha confirmado aún la creación del commit. Comprobar git status y la rama real antes de dar instrucciones de staging; no incluir tmp/ sin revisarlo.
- Se propuso separar motion e imágenes en commits distintos si la distribución de cambios lo permite.


## Pendiente de rendimiento — 1 de octubre de 2026

- Durante la compilación del frontend, Vite avisó de que algunos chunks superan los 500 kB después de minificar. La compilación terminó correctamente; es una advertencia, no un error.
- Antes del despliegue, revisar el tamaño del bundle y valorar la carga diferida por rutas mediante imports dinámicos. Comprobar qué dependencias contribuyen al tamaño antes de decidir cambios; no limitarse a aumentar el umbral del aviso.
- Esta revisión sigue pendiente. El usuario ha pedido realizar el commit al finalizar la sesión.


## Actualización de sesión — 1 de octubre de 2026

- El usuario ha elegido comenzar con alojamiento gratuito y valorar pago más adelante. Se ha considerado Render; su PostgreSQL gratuito caduca a los 30 días. El despliegue sigue pendiente y no se ha confirmado la creación de una cuenta.
- Se ha priorizado esta sesión para las animaciones del editor; el despliegue se retomará después.
- El usuario confirmó la instalación de `motion` en `@orlune/web`. Los imports se harán desde `motion/react`.
- Rama propuesta para este trabajo: `feature/landing-editor-motion`; comprobar la rama real antes de continuar.
- Se han dado instrucciones para animar la entrada de los bloques con `motion.div` (opacidad y desplazamiento vertical de 16 px en 0,2 s), respetando `useReducedMotion`. Todavía no se ha confirmado su implementación ni probado el resultado.
- Próximos pasos de motion: salida con AnimatePresence y reordenación fluida. GSAP queda para la landing y el preview.

### Personalización de bloques acordada

- Los bloques Hero y CTA actuales son una primera versión y se ampliarán.
- Evolución prevista: subir y reemplazar imágenes, ajustar encuadre y posición y editar texto alternativo; colores, alineación, espaciado y disposición de texto e imagen; enlaces de botones; configuración de animaciones por bloque.
- Subir imágenes requerirá almacenamiento de archivos; el contenido del bloque guardará su URL. El proveedor y la implementación no están decididos.
- Para la demo del 15 de octubre se ha acordado incluir un Hero con imagen, enlace del botón y algunas opciones visuales acotadas. Los controles concretos quedan por definir; no se pretende construir un editor de diseño completo.
- Estas funcionalidades están pendientes, no implementadas. Cada ampliación debe reflejarse en los esquemas compartidos, el panel de propiedades y el renderizado de bloques.


Última actualización: 1 de octubre de 2026.

## Producto y objetivo

Orlune es un constructor de landings.
El Kanban queda fuera del producto.

Objetivo inmediato: demo guiada el 15 de octubre de 2026
para Software Crafters Barcelona.

Recorrido de la demo:
login → proyectos → editor → guardar → preview → publicar
→ abrir la landing sin iniciar sesión.

El usuario escribe el código para aprender y poder explicar
las decisiones técnicas durante la presentación.

## Implementado

- Autenticación y gestión de proyectos.
- Editor con biblioteca, lienzo y panel de propiedades.
- Bloques Hero y CTA.
- Edición de textos, eliminación y reordenación.
- Guardado del borrador.
- Preview local, incluidos cambios sin guardar.
- Publicación como copia independiente del borrador.
- Página pública en /p/:projectId.
- Avisos de guardado y publicación bajo la cabecera.
- Ocultación de avisos al modificar el borrador.
- Limpieza de caché de TanStack Query al cerrar sesión.

## Publicación

- Project.blocks contiene el borrador.
- Project.publishedBlocks contiene la copia publicada.
- Project.publishedAt registra la fecha de publicación.
- Publish guarda primero y publica después, en dos peticiones.
- Guardar por sí solo no modifica la versión pública.
- POST /projects/:projectId/landing/publish requiere autenticación.
- GET /public/landings/:projectId permite lectura pública.
- La URL pública todavía utiliza el entorno local.

## Comprobaciones realizadas

El usuario confirmó:
- Compilaciones de API y frontend correctas durante el desarrollo.
- Publicación y acceso público sin sesión.
- Separación entre borrador guardado y versión publicada.
- Avisos visibles y ocultación al volver a editar.
- Cierre de sesión y reingreso tras limpiar la caché.

No se ha confirmado una prueba específica entre dos cuentas.
No hay una suite automatizada identificada en la revisión inicial.

## Motion previsto

- Framer Motion para microinteracciones, entrada y salida
  de bloques y reordenación en el editor.
- GSAP para Hero animado y efectos de scroll en la landing.
- Alcance de demo: pocas animaciones cuidadas.
- Configuración de animaciones por bloque: evolución posterior.
- Contemplar movimiento reducido y limpieza de animaciones.

## Pendientes

1. Confirmar estado de Git y sincronización con GitHub.
2. Preparar configuración por entorno y desplegar.
3. Probar frontend, API y PostgreSQL fuera del ordenador local.
4. Añadir motion acotado para la demo.
5. Pulir login y lista de proyectos.
6. Retirar código y tablas del Kanban, revisando antes los datos.
7. Ensayar la demo y preparar un vídeo de respaldo.

## Estado conocido de Git

Últimos commits comunicados:
- d257b99: publicación y página pública.
- df8be2c: feedback del editor.

El usuario confirmó un commit posterior de limpieza de caché,
pero su identificador y la sincronización final deben verificarse.

La carpeta tmp/ estaba sin seguimiento; su contenido no se ha revisado.

## Limitación del entorno del asistente

Desde el 30 de septiembre, los intentos de ejecutar comandos
fallan al iniciar con helper_unknown_error / setup refresh had errors.

Esto ha impedido leer archivos y verificar cambios directamente.
Las revisiones posteriores se han basado en código pegado y
resultados aportados por el usuario. Reintentar el acceso al retomar.
