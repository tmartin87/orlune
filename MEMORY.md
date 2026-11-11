# Estado actual de Orlune

Actualizado el 11 de noviembre de 2026.

Este documento registra el estado de la aplicación, su configuración, las comprobaciones realizadas y las limitaciones conocidas. No contiene objetivos, fechas de entrega ni planes de trabajo. Las normas de colaboración están en AGENTS.md.

## Aplicación y arquitectura

Orlune es un constructor de landing pages con editor visual.

- Monorepo con pnpm.
- apps/web: React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form y TanStack Query.
- apps/api: Express, TypeScript, Prisma y PostgreSQL; organizado en rutas, controladores, servicios y repositorios.
- packages/shared: esquemas Zod y tipos compartidos.
- TanStack Query gestiona datos del servidor; el borrador y la interfaz del editor utilizan estado local de React.

## Páginas y autenticación

- /: página de inicio con presentación del producto, ejemplo de landing y explicación de uso.
- /login y /register: formularios de acceso y registro.
- /projects: gestión de proyectos, protegida por autenticación.
- /projects/:projectId/editor: editor protegido; /projects/:projectId también abre el editor.
- /p/:projectId: landing pública sin necesidad de iniciar sesión.
- Páginas con carga diferida mediante React.lazy en router/lazy-pages.tsx y Suspense en el router, con indicador Loading page…; se mantiene ProtectedRoute.
- Autenticación mediante token. El cierre de sesión elimina el token y limpia la caché de TanStack Query.
- Las respuestas 401 de la API disparan auth:unauthorized.
- No consta verificación de correo ni recuperación de contraseña implementadas.

## Proyectos

- Creación, renombrado y eliminación con confirmación.
- El esquema compartido del nombre aplica trim y exige al menos un carácter.
- Estados de carga, error con reintento y lista vacía.
- Tarjetas con nombre, portada, número de bloques guardados, estado de publicación y acceso al editor.
- La portada es la primera imagen disponible en los bloques Hero o Image and text guardados, no una captura de la landing.
- Los proyectos publicados muestran acceso a su página pública.
- Los controles de renombrar y eliminar están dentro de Project settings.
- El backend conserva código de Kanban y la restricción que impide eliminar proyectos con tareas.

## Editor

- Cabecera fija con acceso a proyectos, Preview, Save y Publish.
- Biblioteca a la izquierda, lienzo con bloques en el centro, propiedades debajo y preview general a la derecha.
- Selección al pulsar una sección, edición de contenido, eliminación y reordenación.
- Paneles con scroll independiente en escritorio.
- PropertyTabs organiza los controles en pestañas; al seleccionar un bloque comienzan contraídas. Pulsar una pestaña abre sus campos y Collapse los oculta. Se conserva navegación por teclado con flechas, Home y End.
- Pestañas sobresalientes con esquinas superiores suavemente redondeadas. La activa comparte el fondo del panel; el fondo de apoyo comienza 8 px por debajo del borde superior para dejar visible el redondeado.
- Campos en cuadrícula adaptable, sin scroll interior en propiedades. El lienzo cede altura; en escritorio se mantiene la altura de pantalla. Miniatura de imagen de 144 px y controles de imagen a su lado.
- Menos espacio entre el título del panel y los campos; contorno azul más visible en el bloque seleccionado. Scroll del lienzo personalizado en azul.
- Eliminada la franja de avisos bajo la cabecera, también en Preview. El botón Save muestra Saving… y Saved ✓; al cambiar el borrador vuelve a Save.
- Publicación y errores usan un aviso flotante con cierre. El éxito incluye enlace público y desaparece a los ocho segundos, pausándose al interactuar; los errores permanecen hasta cerrarlos o reintentar.
- Animaciones Motion de entrada, salida y reordenación, respetando useReducedMotion.
- Preview completo del borrador, incluidos cambios sin guardar.
- LandingLivePreview renderiza mediante un portal React en un iframe con estilos del documento.
- Viewports de 1280 × 800 para escritorio y 390 × 844 para móvil, escalados mediante ResizeObserver.
- Marcos de monitor y teléfono con scroll interior; los enlaces de la miniatura no navegan.
- Expand / Collapse modifica el ancho de la columna de preview. El panel lateral se muestra desde xl.
- AnimatedBlock aplica entrada suave una vez al entrar en pantalla, en Preview completo y página pública, respetando movimiento reducido. No se añade esta animación al preview lateral. Se utiliza Motion; no hay integración GSAP identificada.

## Bloques disponibles

- Hero: título, subtítulo, texto y enlace de botón, imagen y texto alternativo. Layouts centered, split y background; alineación left/center; temas light/dark. El fondo con imagen fuerza apariencia oscura.
- CTA: título, texto y enlace de botón, temas light/dark.
- Features: título de sección y tres elementos con título y descripción editables.
- Image and text: título, descripción, imagen, texto alternativo y posición izquierda/derecha. En móvil la imagen aparece encima.
- spacing y headingSize son opcionales en el esquema de los cuatro bloques. En feature/heading-size, el renderizado aplica ambos valores a los cuatro bloques, incluida la corrección del espaciado de Image and text. La sección Design ofrece ambos selectores en Hero, CTA, Features e Image and text, comprobado en el código local.
- Medium conserva el espaciado previo: py-16 en Hero, Features e Image and text, py-12 en CTA. Small usa py-8 y Large py-24. El Hero con fondo mantiene además min-h-96. Heading size admite Small, Medium y Large; Medium conserva el tamaño anterior de cada título.
- Los enlaces y las imágenes admiten URL HTTP/HTTPS; los campos opcionales mantienen compatibles los bloques anteriores.
- Los enlaces funcionan en Preview completo y en la página pública; se desactivan durante la edición.

## Imágenes

- Integración con Cloudinary mediante subida firmada.
- POST /projects/:projectId/images/upload-signature requiere autenticación y comprueba la propiedad del proyecto.
- La firma incluye identificador por proyecto y overwrite=false. La respuesta usa Cache-Control: no-store.
- El frontend envía el archivo directamente a Cloudinary mediante FormData; no le envía el token de Orlune.
- Validación del frontend: JPG/JPEG, PNG o WebP y máximo 5 MiB. No se confirmó un límite equivalente en el proveedor.
- HeroImageUpload muestra selección, progreso de subida y errores; actualiza la URL del bloque.
- Las credenciales del proveedor permanecen en el backend y no se registran en este documento.

## Guardado y publicación

- Project.blocks contiene el borrador.
- Project.publishedBlocks contiene la copia publicada y Project.publishedAt su fecha.
- Publish guarda primero y publica después mediante dos peticiones.
- Guardar no modifica por sí solo la versión pública.
- POST /projects/:projectId/landing/publish requiere autenticación.
- GET /public/landings/:projectId permite lectura pública.

## Identidad visual y logo

- Interfaz con acentos azules, superficies claras y degradados suaves.
- Biblioteca y panel inferior del editor con degradado azul; controles de propiedades blancos.
- Los colores de los bloques de las landings son independientes de los de la aplicación.
- SVG aportados por el usuario desde C:/Users/User/Documents/PROYECTOS/DISEÑO/ORLUNE/v2, copiados sin modificar.
- El logo recibido utiliza un símbolo de tres piezas con degradados azul/cian y letras sin cortes.
- Assets en apps/web/public/branding/: orlune-horizontal.svg, orlune-vertical.svg, orlune-symbol.svg y orlune-icon.svg.
- Horizontal en Home, Projects y cabeceras de escritorio de Login/Register.
- Vertical en Login/Register desde móvil.
- Recuadro azul en la cabecera del editor y como favicon. Símbolo independiente disponible entre los assets.
- Título de pestaña: Orlune.
- Botones activos con cursor de mano y desactivados con cursor no permitido, mediante reglas generales en index.css.

## Despliegue registrado

- Frontend Render: https://orlune-2t8d.onrender.com, Static Site llamado orlune.
- API Render: https://orlune-api.onrender.com, Web Service llamado orlune-api.
- PostgreSQL alojado en Neon tras configurar la nueva conexión en Render. El usuario confirmó el funcionamiento el 7 de noviembre y volvió a confirmarlo el 9. La API permanece en Render, Frankfurt. La versión y región efectivas de Neon no se han comprobado directamente.
- Configuración registrada: rama main, Root Directory vacío, NODE_VERSION=24 y publicación del frontend desde apps/web/dist.
- apps/web/src/lib/config.ts centraliza VITE_API_URL para clientes privados y públicos.
- API usa PORT y FRONTEND_URL y escucha en 0.0.0.0.
- Frontend: VITE_API_URL=https://orlune-api.onrender.com.
- API: FRONTEND_URL=https://orlune-2t8d.onrender.com; DATABASE_URL, JWT_SECRET y variables de Cloudinary se configuran exclusivamente en el servidor.
- Regla SPA de Render: /* hacia /index.html con acción Rewrite.
- La compilación utiliza corepack pnpm porque corepack enable falló con EROFS en Render. El arranque actual ejecuta Prisma y Node directamente, sin Corepack/pnpm.
- Compilación API registrada: instalación de dependencias, build shared, prisma generate y build API.
- Start Command actual, cambiado en Render el 29 de octubre con Root Directory vacío: `cd apps/api && node node_modules/prisma/build/index.js migrate deploy && node dist/server.js`. El usuario confirmó que recuperó el acceso. Es una configuración del panel, no un cambio de código.
- Compilación frontend registrada: instalación, build shared y build web.
- El usuario confirmó el funcionamiento del despliegue y la eliminación de credenciales antiguas tras su rotación.
- Las cuentas y los datos locales son independientes de los de producción en Neon.
- Los ajustes de pestañas, avisos y diseño están integrados en main y desplegados. El editor en producción fue comprobado en navegador el 22 de octubre.

## Diseño integrado en producción

- Home: hero de altura mínima de pantalla con captura del editor, ejemplo real de Studio North enlazado a su landing pública, enlaces Log in / Sign up, tarjetas inferiores blancas y footer centrado.
- Cabeceras de Home y Projects con sombra.
- Contenedores Hero y CTA sin esquinas redondeadas; botones e imágenes pueden conservarlas.
- README actualizado con arquitectura, configuración y funcionalidades; utiliza el logo horizontal blanco. Sus opciones ampliadas de personalización e IA siguen marcadas como no implementadas.

## Comprobaciones realizadas

- El usuario confirmó compilación y funcionamiento local del espaciado, y después indicó que todo estaba correcto tras los pasos de integración y despliegue. El asistente revisó el código integrado el 11 de noviembre y detectó la omisión de Image and text indicada arriba. No repitió las pruebas en navegador.
- El 22 de octubre pasaron TypeScript de shared, API y web, ESLint del frontend y build de Vite. Se ejecutaron herramientas locales directamente por un fallo de acceso de Corepack a registry.npmjs.org. Vite avisó de que el Node local 20.17.0 era inferior al mínimo requerido, pero terminó correctamente. No se han repetido estas pruebas el 5 de noviembre.
- Build registrado: JavaScript principal 210,59 kB y CSS 40,38 kB sin comprimir, sin aviso de chunks mayores de 500 kB.
- Pasaron 28 comprobaciones de API en producción: registro, login, duplicados, contraseña incorrecta, acceso sin sesión, creación, guardado, publicación, aislamiento entre cuentas y separación de borrador y versión publicada.
- La segunda cuenta no pudo leer, modificar, publicar ni eliminar el proyecto ajeno, ni obtener una firma de subida para él. Tampoco aparecía en su listado.
- Prueba independiente en navegador: registro, login, creación de proyecto, subida real a Cloudinary, guardado, vuelta a Projects, reapertura con imagen conservada, publicación y acceso público después de cerrar sesión.
- Revisión visual en escritorio y móvil. El editor móvil apila la biblioteca antes del lienzo y exige bastante desplazamiento. En escritorios bajos los botones del hero de Home pueden quedar fuera del primer vistazo.
- Se crearon tres cuentas técnicas QA y dos proyectos QA con autorización del usuario. No se conservaron contraseñas ni tokens. No se eliminaron estos datos ni se modificaron Studio North o Forma Studio.
- Evidencia local: output/qa/public-mobile.png, sin seguimiento en Git.

## Incidencias de alojamiento y estado actual

- El 7 de noviembre el usuario decidió empezar con una base vacía, sin recuperar los datos anteriores. Confirmó que Orlune funcionaba tras conectar Neon; el 9 confirmó que la base estaba bien. El asistente no ha repetido el recorrido de registro, guardado, reapertura y publicación contra Neon.
- La búsqueda local del 6 de noviembre no localizó una exportación de producción en las carpetas examinadas. orlune.zip contenía migraciones, y los SQL de Descargas eran anteriores al desarrollo de Orlune. La inspección de una posible base de desarrollo quedó pendiente.
- Home enlaza al nuevo Studio North, https://orlune-2t8d.onrender.com/p/cmw6b0cl900011x9rvi41dbum. El cambio se integró en main con d95cec0. El asistente comprobó el enlace en el JavaScript publicado y una respuesta HTTP 200 del endpoint público con sus cuatro bloques. No realizó una revisión visual en navegador.
- Se instalaron siete skills de Neon para Codex en .agents/skills/ y skills-lock.json el 7 de noviembre. Estos archivos siguen sin seguimiento en Git.
- El 29 de octubre Render notificó exceso de memoria de la API sobre 512 MB y reinicio automático. Los logs posteriores mostraban comprobaciones de dependencias y numerosas consultas a npm durante el arranque con Corepack/pnpm.
- El arranque directo de Prisma y Node permitió recuperar el acceso según el usuario. No se ha demostrado la causa del primer exceso de memoria ni descartado su repetición.
- Argon2 usa argon2id; la configuración instalada de hash tiene memoryCost=65536 KiB. No se identificaron límites de peticiones o concurrencia en las rutas de autenticación. Su contribución al incidente fue una hipótesis no confirmada; no se modificó Argon2.
- El 5 de noviembre, PostgreSQL orlune-db aparece como Free database expired y SUSPENDED en el panel. No hay confirmación de eliminación ni de recuperación de datos.
- Los botones Upgrade database y Upgrade your instance no abrieron el cambio de plan según el usuario. Los errores 429 visibles eran del endpoint de monitorización Sentry; no demuestran bloqueo de la actualización por límite de peticiones. La respuesta GraphQL consultada solo confirmó SUSPENDED.
- El usuario confirmó que envió un correo a soporte de Render. No consta respuesta ni reactivación. Enviar el correo no confirma una ampliación del plazo de conservación.
- La documentación de Render consultada el 5 de noviembre indica caducidad de PostgreSQL gratuito a los 30 días y 14 días posteriores para actualizar antes de eliminar los datos. No se ha verificado la fecha límite exacta de esta base en el panel.
- El panel mostró una opción de 6 USD/mes de cómputo para la base. No consta contratación ni coste total confirmado. La API seguía en Free en las capturas; cambiar su plan o el del espacio de trabajo no reactiva PostgreSQL.
- El espacio de trabajo también se llama orlune-db: se debe distinguir del recurso PostgreSQL del mismo nombre y del servidor orlune-api.
- No consta una copia de seguridad exportada de producción ni una configuración de copias periódicas verificada. No hay monitorización ni recordatorios automáticos configurados por el asistente.

## Limitaciones funcionales registradas

- No consta recuperación de contraseña ni verificación de correo implementada.
- La personalización incluye espaciado vertical y tamaños de título en la rama actual. Los controles ampliados de proporciones, colores, familias tipográficas, nuevas variantes e IA no están implementados en el código revisado.
- Las pruebas manuales y de compilación no equivalen a una suite automática de regresión.

## Estado de Git comprobado

- Antes de esta actualización: main...origin/main, HEAD dd780c3, `feat: add vertical spacing options to landing blocks`, sin cambios en archivos rastreados. La referencia local origin/main coincide; no se ha realizado fetch en esta revisión.
- Rama actual: feature/heading-size, creada desde main.
- MEMORY.md, BlockRenderer.tsx, PropertiesPanel.tsx, landing-block.ts y landing.schema.ts están modificados en esta actualización, pendientes de commit.
- .agents/, .vscode/, skills-lock.json, output/ y tmp/ siguen sin seguimiento. output/ contiene imágenes, variantes de marca y evidencia QA; tmp/ no se ha revisado.
