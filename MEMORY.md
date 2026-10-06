# Contexto de Orlune

## Despliegue completado — 6 de octubre de 2026, cierre de la tarde

Esta sección prevalece sobre todas las notas anteriores de despliegue pendientes que aparecen más abajo.

- Orlune está desplegado en Render y el usuario confirmó el recorrido completo. Demo prevista para el 15 de octubre de 2026.
- Frontend: Static Site llamado orlune, https://orlune-2t8d.onrender.com ; login en /login.
- API: Web Service orlune-api, https://orlune-api.onrender.com ; el usuario confirmó la respuesta de GET / con el mensaje Orlune API.
- Base de datos: orlune-db, PostgreSQL 18, Frankfurt. API también en Frankfurt. La base aparece dentro de My project y la API aparecía en Ungrouped Services. El workspace también se llama orlune-db: distinguirlo del recurso PostgreSQL.
- feature/deployment-config integrada y subida a main en f57225b, según la salida de Git compartida. En la revisión local previa a esta actualización: main...origin/main y solo tmp/ sin seguimiento. No se ha hecho fetch ni ningún commit por el asistente.
- Configuración implementada: apps/web/src/lib/config.ts centraliza VITE_API_URL para clientes privados y públicos; apps/web/.env.example documenta el valor local. API utiliza PORT y FRONTEND_URL y escucha en 0.0.0.0.
- Render: rama main, Root Directory vacío y NODE_VERSION=24. El frontend publica apps/web/dist.
- Build API corregido: corepack pnpm install --frozen-lockfile --prod=false && corepack pnpm --filter @orlune/shared build && corepack pnpm --filter @orlune/api exec prisma generate && corepack pnpm --filter @orlune/api build.
- Start API indicado: corepack pnpm --filter @orlune/api exec prisma migrate deploy && corepack pnpm --filter @orlune/api start. El registro compartido todavía mostraba la variante sin corepack; el arranque posterior funcionó. Confirmar el valor efectivo en Render si hace falta.
- Build frontend indicado: corepack pnpm install --frozen-lockfile --prod=false && corepack pnpm --filter @orlune/shared build && corepack pnpm --filter @orlune/web build.
- corepack enable falló con EROFS al modificar /usr/bin/pnpm. Se corrigió usando corepack pnpm directamente.
- Variables API: DATABASE_URL (conexión interna de Render), JWT_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET y FRONTEND_URL=https://orlune-2t8d.onrender.com. Render proporciona PORT. No guardar secretos en la memoria.
- Variable pública del frontend: VITE_API_URL=https://orlune-api.onrender.com. Regla SPA configurada: Source /*, Destination /index.html, Action Rewrite. El usuario confirmó el login al recargar.
- Error P1013 corregido sustituyendo una DATABASE_URL mal formada. Una credencial se compartió accidentalmente y se guio su rotación. El usuario confirmó expresamente que las credenciales antiguas están eliminadas. No reproducirlas.
- Error CORS corregido: FRONTEND_URL se había cambiado en el Static Site, pero la API seguía permitiendo localhost:5173. Se cambió en orlune-api y se desplegó de nuevo; login correcto.
- Cuenta de demo creada por POST /auth/register desde PowerShell con contraseña solicitada de forma oculta. La base de Render es independiente: no se copiaron usuarios ni proyectos locales.
- Validación local: usuario compartió lint web, build API y build web correctos y confirmó arranque de producción. Validación en Render: confirmó login, crear proyecto, editar Hero, subir imagen, guardar y recargar, publicar y abrir la landing pública en incógnito. Pruebas funcionales realizadas por el usuario, no por el asistente.
- Planes gratuitos por elección del usuario. API duerme tras inactividad y PostgreSQL gratuito caduca a los 30 días de su creación (6 de octubre): revisar migración o pago antes de caducar y preparar el servicio antes de la demo. No se han configurado recordatorios ni monitorización automática.
- Próximo trabajo propuesto: GSAP para Hero y preview respetando movimiento reducido, y ensayo de la demo. Pendientes: aviso de chunks >500 kB (577,72 kB en build compartido), retirar restos de Kanban y preparar respaldo.
- Actualización de esta memoria expresamente solicitada por el usuario. No se han modificado archivos de aplicación ni creado commits; tmp/ continúa fuera del alcance.

## Estado actual — 6 de octubre de 2026

Esta sección prevalece sobre los pendientes históricos que aparecen más abajo.

### Avances integrados

- Historial local verificado: 0eadfbe (motion del editor), b8961ee (imágenes por URL), 0a3d645 (subida firmada con Cloudinary), dfb5dbd (enlaces del Hero), 910aaea (diseño del login), 7002aef (interfaz de proyectos y validación de nombres).
- El usuario confirmó los pushes. Al revisar el repositorio, main y la referencia local origin/main coinciden en 7002aef; no se ha realizado un fetch nuevo en esta comprobación.
- Hero admite buttonUrl opcional HTTP/HTTPS. El enlace funciona en Preview y en la landing pública; el editor recibe isEditing para impedir navegar mientras se edita. El usuario confirmó los tres comportamientos.
- Login con identidad de Orlune, formulario diseñado, errores accesibles y botón desactivado con estado Signing in mientras se envía. El usuario confirmó su funcionamiento.
- Lista de proyectos con tarjetas adaptables, acceso al editor, estado vacío, reintento de carga y controles de renombrar/eliminar dentro de Project settings.
- Formularios de creación y renombrado diseñados; eliminación con confirmación y cancelación. Se conserva la restricción antigua del backend que impide borrar proyectos con tareas.
- projectNameSchema compartido aplica trim y min(1) tanto a creación como a actualización. Se dieron instrucciones para retirar la validación duplicada de los formularios. El cambio está integrado en 7002aef; no se han repetido compilaciones ni pruebas de navegador por el asistente en esta actualización.

### Despliegue: punto exacto para continuar

- Prioridad inmediata: preparar y desplegar frontend, API y PostgreSQL para la demo del 15 de octubre de 2026; quedan 9 días desde esta actualización.
- Se ha propuesto crear feature/deployment-config desde main. En la comprobación actual la rama sigue siendo main; no dar por creada la nueva rama.
- Instrucciones entregadas, todavía sin aplicar en el código observado: crear apps/web/src/lib/config.ts que lea VITE_API_URL, falle si falta y elimine barras finales; importar API_URL desde los clientes privado y público.
- Se indicó crear apps/web/.env.local y apps/web/.env.example con VITE_API_URL=http://localhost:3000. git check-ignore confirma que la ruta .env.local está ignorada; no se ha leído su contenido ni confirmado su existencia.
- Ambos clientes siguen utilizando http://localhost:3000 en el código. No hay config.ts ni .env.example nuevos identificados por Git. El próximo paso es que el usuario aplique las instrucciones, reinicie Vite y compile el frontend.
- Después: preparar puerto y CORS configurables en la API, configuración de compilación/arranque y migraciones, alojamiento gratuito y pruebas completas en el entorno desplegado. No hay despliegue ni cuenta de Render confirmados.
- Las variables VITE_ se incluyen en el navegador; solo deben contener configuración pública. Cloudinary API Secret, JWT_SECRET y DATABASE_URL siguen siendo exclusivos del backend.

### Estado de herramientas y Git

- El acceso de lectura mediante terminal vuelve a funcionar el 6 de octubre. Las notas anteriores sobre imposibilidad de leer archivos describen el periodo anterior.
- Antes de editar esta memoria: main sin modificaciones de archivos seguidos y únicamente tmp/ sin seguimiento. El contenido de tmp/ sigue sin revisarse; no incluirlo en commits.
- El usuario sigue escribiendo código y ejecutando Git. Esta actualización de MEMORY.md está expresamente autorizada; no se ha creado ningún commit.
- Siguen pendientes revisar el aviso de chunks superiores a 500 kB, GSAP para landing/preview, retirar el Kanban restante y ensayar la demo con respaldo.


## Subida de imágenes completada — 1 de octubre de 2026

Esta actualización sustituye las notas anteriores que indicaban que el proveedor y la subida de archivos estaban pendientes.

- Proveedor elegido: Cloudinary, con cuenta gratuita creada por el usuario.
- Rama confirmada para esta funcionalidad: feature/hero-image-upload. El commit de esta funcionalidad todavía no se ha confirmado.
- Credenciales configuradas únicamente en apps/api/.env; el usuario confirmó que Git ignora ese archivo. No incluir credenciales en documentación ni commits.
- SDK cloudinary instalado en la API y configuración en src/lib/cloudinary.ts.
- El repositorio de proyectos incorpora findProjectByIdAndUserId para comprobar la propiedad del proyecto.
- Servicio upload.service.ts: verifica el propietario y firma timestamp, public_id único por proyecto, upload_preset y overwrite=false. Devuelve cloudName, apiKey, signature y params, nunca el API Secret.
- Ruta protegida: POST /projects/:projectId/images/upload-signature. La respuesta utiliza Cache-Control: no-store.
- Preset previsto/utilizado: orlune_hero_images, Signed, formatos JPG/JPEG, PNG y WebP, sin sobrescritura. No se encontró un límite de tamaño configurable en la consola.
- El frontend solicita la firma con el token de Orlune y sube el archivo directamente al endpoint image/upload de Cloudinary mediante FormData, sin enviarle el token de Orlune.
- image-upload-api.ts comprueba formato MIME y tamaño máximo de 5 MiB antes de subir. Ese límite es una comprobación del frontend, no un límite confirmado del proveedor.
- HeroImageUpload muestra el selector, el estado de subida y los errores. Al completarse, actualiza imageUrl del Hero; Save persiste el borrador y Publish actualiza la copia pública.
- projectId se transmite desde LandingEditorPage a LandingEditor, PropertiesPanel y HeroImageUpload. PropertiesPanel utiliza key={selectedBlock.id}.
- Se corrigió un error Invalid cloud_name: el usuario ajustó el nombre del entorno de Cloudinary y reinició la API.
- El usuario confirmó compilación correcta y las pruebas de subir imagen, guardar y recargar, publicar y abrir la página pública, y reemplazar la imagen.
- Las pruebas funcionales fueron realizadas por el usuario. La terminal del asistente sigue sin funcionar; no afirmar una verificación local independiente.

### Próxima acción

- Revisar git status con el usuario y preparar el commit de subida de imágenes, incluyendo esta memoria y excluyendo .env y tmp/.
- Siguen pendientes el despliegue, la revisión del aviso de chunks de más de 500 kB, GSAP en la landing/preview y el resto de personalización acordada.


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
