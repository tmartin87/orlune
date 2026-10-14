# Estado actual de Orlune

Actualizado el 14 de octubre de 2026.

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
- PostgreSQL: recurso orlune-db, versión 18, Frankfurt; API también en Frankfurt.
- Configuración registrada: rama main, Root Directory vacío, NODE_VERSION=24 y publicación del frontend desde apps/web/dist.
- apps/web/src/lib/config.ts centraliza VITE_API_URL para clientes privados y públicos.
- API usa PORT y FRONTEND_URL y escucha en 0.0.0.0.
- Frontend: VITE_API_URL=https://orlune-api.onrender.com.
- API: FRONTEND_URL=https://orlune-2t8d.onrender.com; DATABASE_URL, JWT_SECRET y variables de Cloudinary se configuran exclusivamente en el servidor.
- Regla SPA de Render: /* hacia /index.html con acción Rewrite.
- Se utiliza corepack pnpm directamente porque corepack enable falló con EROFS en Render.
- Compilación API registrada: instalación de dependencias, build shared, prisma generate y build API.
- Arranque registrado: prisma migrate deploy seguido de start de la API.
- Compilación frontend registrada: instalación, build shared y build web.
- El usuario confirmó el funcionamiento del despliegue y la eliminación de credenciales antiguas tras su rotación.
- Las cuentas y los datos locales son independientes de los de Render.
- El usuario confirmó el logo, el recorrido de la aplicación y las animaciones en Render. Los ajustes actuales de pestañas y avisos siguen locales, sin despliegue confirmado.

## Comprobaciones y limitaciones conocidas

- El 14 de octubre el asistente ejecutó ESLint directamente con node node_modules/eslint/bin/eslint.js . desde apps/web: correcto. Se usa esta vía por los fallos de conexión de Corepack al ejecutar pnpm lint.
- pnpm --filter @orlune/web build correcto tras los últimos retoques del editor.
- La carga diferida elimina el aviso de chunks >500 kB. Último build: archivo principal de 210,59 kB y CSS de 41,10 kB sin comprimir.
- El usuario confirmó el resultado visual final del editor con «lo veo todo perfecto». El asistente revisó la captura y el código; no realizó una prueba independiente en navegador.
- El usuario había confirmado login, creación de proyectos, edición, subida de imágenes, guardado y recarga, publicación y acceso público en Render.
- No consta una prueba específica de aislamiento entre dos cuentas.
- La última configuración de alojamiento registrada utiliza planes gratuitos: la API se suspende por inactividad y el PostgreSQL creado el 6 de octubre tenía caducidad a los 30 días. No se ha vuelto a comprobar su configuración en el panel.
- No hay monitorización ni recordatorios automáticos configurados.

## Estado de Git comprobado

- Rama: fix/editor-feedback-layout; HEAD c26ece0, perf: lazy load application routes.
- Commits anteriores integrados: 4261620, animaciones de las landings; 245607c, identidad de marca.
- Cambios actuales sin commit: avisos flotantes y estado de Save, pestañas de propiedades, miniatura de imagen, selección de bloques, scroll azul y cursores de botones.
- Archivos modificados: BlockLibrary.tsx, HeroImageUpload.tsx, LandingEditor.tsx, PropertiesPanel.tsx, PropertySection.tsx, LandingEditorPage.tsx e index.css; nuevo PropertyTabs.tsx.
- MEMORY.md actualizado con el estado actual; sin objetivos ni planes.
- output/ y tmp/ siguen sin seguimiento y no forman parte de esta entrega. output/ contiene exploraciones, imágenes de Studio North y copias de trabajo; tmp/ no se ha revisado.
- No se ha creado el commit de estos ajustes ni realizado su merge o push.
