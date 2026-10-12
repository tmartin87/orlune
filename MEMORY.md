# Estado actual de Orlune

Actualizado el 12 de octubre de 2026.

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
- Propiedades distribuidas horizontalmente en una cuadrícula adaptable; sus apartados comienzan plegados.
- Avisos de guardado y publicación; se ocultan al modificar el borrador.
- Animaciones Motion de entrada, salida y reordenación, respetando useReducedMotion.
- Preview completo del borrador, incluidos cambios sin guardar.
- LandingLivePreview renderiza mediante un portal React en un iframe con estilos del documento.
- Viewports de 1280 × 800 para escritorio y 390 × 844 para móvil, escalados mediante ResizeObserver.
- Marcos de monitor y teléfono con scroll interior; los enlaces de la miniatura no navegan.
- Expand / Collapse modifica el ancho de la columna de preview. El panel lateral se muestra desde xl.
- No hay integración GSAP identificada en el código revisado.

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
- El despliegue del logo nuevo no está confirmado.

## Comprobaciones y limitaciones conocidas

- Tras integrar el logo, el asistente ejecutó pnpm --filter @orlune/web build correctamente.
- Sigue el aviso de bundle superior a 500 kB: aproximadamente 623 kB sin comprimir en esa compilación.
- Corepack impidió arrancar pnpm lint por un fallo de conexión al registro. ESLint se ejecutó directamente con node node_modules/eslint/bin/eslint.js . desde apps/web y terminó correctamente.
- git diff --check correcto después de la integración del logo.
- El usuario respondió «PERFECTO» a la integración. El asistente no realizó una comprobación independiente en navegador.
- El usuario había confirmado login, creación de proyectos, edición, subida de imágenes, guardado y recarga, publicación y acceso público en Render.
- No consta una prueba específica de aislamiento entre dos cuentas.
- La última configuración de alojamiento registrada utiliza planes gratuitos: la API se suspende por inactividad y el PostgreSQL creado el 6 de octubre tenía caducidad a los 30 días. No se ha vuelto a comprobar su configuración en el panel.
- No hay monitorización ni recordatorios automáticos configurados.

## Estado de Git comprobado

- Rama: feature/brand-logo.
- HEAD al iniciar esta actualización: 3bfe3ac, feat: add project card covers and publication details.
- Commit anterior: cb999a1, feat: unify app blue theme and simplify projects page.
- La integración del logo y MEMORY.md tienen cambios sin commit.
- Archivos de aplicación modificados: apps/web/index.html, LandingEditor.tsx, HomePage.tsx, LoginPage.tsx, ProjectsPage.tsx y RegisterPage.tsx.
- apps/web/public/branding/ contiene los cuatro SVG nuevos sin seguimiento.
- output/ contiene exploraciones de branding sin seguimiento; tmp/ también está sin seguimiento y su contenido no se ha revisado.
- No se ha realizado commit, merge ni push de la integración del logo desde esta conversación.
