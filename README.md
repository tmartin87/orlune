<p align="center">
  <img src="apps/web/public/branding/orlune-horizontal.svg" alt="Orlune" width="280" />
</p>

# Orlune

Orlune es un **landing-page builder full-stack** que permite crear y editar páginas mediante bloques reutilizables y persistir su contenido en base de datos.

Está desarrollado con React, TypeScript, Node.js, Express, Prisma y PostgreSQL, dentro de un monorepo con tipos y esquemas de validación compartidos entre frontend y backend.

> 🚧 Proyecto actualmente en desarrollo.

**[Abrir Orlune](https://orlune-2t8d.onrender.com/)** · **[Repositorio en GitHub](https://github.com/tmartin87/orlune)**

## Características

Actualmente Orlune permite:

- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Rutas protegidas en el frontend.
- Creación y gestión de proyectos.
- Landing builder asociado a cada proyecto.
- Añadir bloques `Hero`, `CTA`, `Features` e `Image and text`.
- Seleccionar y editar bloques.
- Eliminar y reordenar bloques.
- Guardar una landing en PostgreSQL.
- Recuperar su contenido y orden después de recargar.
- Autorización de recursos por usuario.
- Validación de datos mediante Zod.
- Gestión centralizada de errores HTTP.
- Tarjetas de proyecto con portada, número de bloques y estado de publicación.
- Subida de imágenes a Cloudinary mediante firmas generadas en la API.
- Controles de edición organizados en pestañas expandibles.
- Preview en vivo de escritorio y móvil, con scroll dentro del dispositivo.
- Preview completo del borrador, incluidos cambios sin guardar.
- Publicación de una versión independiente del borrador con URL pública.
- Animaciones que respetan la preferencia de movimiento reducido.
- Carga diferida de las páginas de la aplicación.

## Bloques disponibles

| Bloque | Personalización |
| --- | --- |
| Hero | Título, subtítulo, botón y enlace, imagen y texto alternativo; disposición centrada, imagen junto al texto o fondo; alineación y tema |
| Features | Título de sección y tres elementos con título y descripción |
| Image and text | Título, descripción, imagen, texto alternativo y posición izquierda/derecha |
| Call to action | Título, botón con enlace y tema claro/oscuro |

Los botones enlazan a direcciones HTTP/HTTPS en Preview completo y en la página pública. Durante la edición no navegan.

## Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- React Hook Form
- Motion
- Zod

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Argon2
- Zod

### Tooling

- pnpm
- pnpm workspaces
- Git

### Servicios

- Cloudinary para imágenes
- Render para frontend, API y PostgreSQL

## Arquitectura

### Backend

La API sigue una arquitectura por capas:

```text
HTTP Request
    │
    ▼
Route
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
Prisma
    │
    ▼
PostgreSQL
```

Cada capa mantiene una responsabilidad concreta:

- **Route:** define endpoints y aplica middleware.
- **Controller:** gestiona la entrada y salida HTTP.
- **Service:** contiene la lógica de negocio.
- **Repository:** encapsula el acceso a datos.
- **Prisma:** proporciona acceso tipado a PostgreSQL.

### Frontend

El frontend diferencia entre **server state** y **estado local**.

TanStack Query gestiona los datos procedentes de la API, su caché y las mutations de persistencia. React mantiene el estado local del editor mientras el usuario modifica la landing.

```text
PostgreSQL
    │
    ▼
API
    │
    ▼
TanStack Query
    │
    ▼
LandingEditor
    │
    ▼
Local draft
    │
    │ Save
    ▼
Mutation
    │
    ▼
API
```

El editor utiliza **discriminated unions** de TypeScript para modelar los distintos tipos de bloques de forma segura.

Los contratos principales se definen mediante Zod en `@orlune/shared` y se comparten entre frontend y backend.

## Estructura

Orlune utiliza un monorepo con pnpm workspaces:

- **apps/web:** interfaz, rutas, formularios y editor visual.
- **apps/api:** autenticación, proyectos, persistencia y publicación.
- **packages/shared:** esquemas Zod y tipos TypeScript compartidos, inferidos de esos esquemas.

Esto mantiene los contratos de frontend y backend alineados sin duplicar sus definiciones.

```text
apps/
├── api/
│   ├── prisma/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       └── middleware/
│
└── web/
    └── src/
        ├── features/
        │   └── landing-builder/
        ├── pages/
        ├── router/
        └── lib/

packages/
└── shared/
    └── src/
        └── schemas/
```

## Modelo de datos

Cada usuario puede tener varios proyectos y cada proyecto almacena los bloques que forman su landing page.

```mermaid
erDiagram
    User ||--o{ Project : owns
    Project ||--o{ LandingBlock : contains
```

Los bloques almacenan su tipo, contenido y posición, permitiendo reconstruir la landing manteniendo el orden definido en el editor.

El proyecto también guarda una copia pública en `publishedBlocks` y su fecha en `publishedAt`. **Save** actualiza el borrador; **Publish** guarda y después publica mediante dos peticiones. Los cambios posteriores en el borrador no alteran la versión pública hasta volver a publicar.

## API del Landing Builder

```text
GET /projects/:projectId/landing
PUT /projects/:projectId/landing
POST /projects/:projectId/landing/publish
POST /projects/:projectId/images/upload-signature
GET /public/landings/:projectId
```

El guardado de una landing se realiza mediante una transacción y el backend comprueba que el proyecto pertenece al usuario autenticado.

## Instalación

### Requisitos

- Node.js 24, utilizado en el despliegue.
- pnpm 11, conforme a la configuración del repositorio.
- PostgreSQL con una base de datos de desarrollo creada.
- Cloudinary con un upload preset llamado **orlune_hero_images**, en modo **Signed**, para JPG/JPEG, PNG y WebP.

Las variables de Cloudinary son necesarias para arrancar la API con su configuración actual. El frontend comprueba un máximo de 5 MiB por imagen.

### 1. Instalar dependencias

    git clone https://github.com/tmartin87/orlune.git
    cd orlune
    pnpm install

### 2. Configurar el entorno

Crea **apps/api/.env** con los valores de tu entorno:

    DATABASE_URL=postgresql://USUARIO:CONTRASENA@localhost:5432/orlune
    JWT_SECRET=REEMPLAZAR_POR_UN_SECRETO_ALEATORIO_LARGO
    PORT=3000
    FRONTEND_URL=http://localhost:5173
    CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME
    CLOUDINARY_API_KEY=TU_API_KEY
    CLOUDINARY_API_SECRET=TU_API_SECRET

Crea **apps/web/.env.local**, tomando como referencia apps/web/.env.example:

    VITE_API_URL=http://localhost:3000

Estos valores son marcadores de ejemplo. Las credenciales deben permanecer fuera de Git. Las variables VITE_ son públicas y no deben contener secretos.

### 3. Preparar tipos y base de datos

Desde la raíz:

    pnpm --filter @orlune/shared build
    pnpm --filter @orlune/api exec prisma generate
    pnpm --filter @orlune/api exec prisma migrate deploy

**migrate deploy** aplica las migraciones existentes. Para crear una migración durante el desarrollo se utiliza **prisma migrate dev**.

### 4. Arrancar la aplicación

En una terminal:

    pnpm --filter @orlune/api dev

En otra:

    pnpm --filter @orlune/web dev

Abre http://localhost:5173 y crea una cuenta desde /register. La API escucha por defecto en http://localhost:3000. Si cambia el puerto del frontend, actualiza FRONTEND_URL en la API.

Si modificas el paquete compartido, vuelve a compilarlo para actualizar sus exportaciones.

## Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm --filter @orlune/web dev` | Inicia el frontend |
| `pnpm --filter @orlune/web build` | Compila el frontend |
| `pnpm --filter @orlune/web lint` | Comprueba el código del frontend |
| `pnpm --filter @orlune/api dev` | Inicia la API |
| `pnpm --filter @orlune/api build` | Compila la API |
| `pnpm --filter @orlune/shared build` | Compila el paquete shared |
| `pnpm --filter @orlune/api exec prisma studio` | Abre Prisma Studio |

## Roadmap

### Completado

- [x] Registro y login
- [x] Autenticación JWT
- [x] Gestión de proyectos
- [x] Autorización por usuario
- [x] Bloques Hero, CTA, Features e Image and text
- [x] Edición de contenido
- [x] Eliminación y reordenación de bloques
- [x] Persistencia del landing builder
- [x] Recuperación de landings guardadas

- [x] Interfaz visual del editor
- [x] Preview de la landing
- [x] Nuevos tipos de bloques
- [x] Publicación de landing pages
- [x] URL pública para cada landing
- [x] Deploy

### Pendiente

- [ ] Integración con IA (sin implementar ni fecha prevista)

## Despliegue

- Frontend: [Orlune](https://orlune-2t8d.onrender.com/).
- API: [Orlune API](https://orlune-api.onrender.com/).
- El sitio estático publica **apps/web/dist**.
- **VITE_API_URL** apunta a la API pública.
- **FRONTEND_URL** en la API coincide con el origen del frontend.
- La API utiliza el **PORT** del entorno y escucha en **0.0.0.0**.
- Regla de reescritura del sitio estático: **/* → /index.html**, para recargar las rutas de React.
- Migraciones de producción mediante **prisma migrate deploy**.

## Desarrollo

Orlune se desarrolla de forma incremental mediante ramas de funcionalidad.

Antes de integrar una feature en `main`, los cambios se validan manualmente y se compilan los paquetes afectados para mantener una arquitectura consistente y un historial de Git limpio.


La compilación y el lint no sustituyen las pruebas del recorrido en el navegador: acceso, creación de proyectos, edición, subida de imágenes, guardado, recarga y publicación.
