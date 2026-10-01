# Contexto de Orlune

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