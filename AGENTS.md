# Instrucciones de trabajo para Orlune

## Forma de colaborar

- El usuario escribe el código y ejecuta los comandos.
- El asistente explica, propone cambios y revisa los resultados.
- No modificar archivos ni ejecutar operaciones de Git que cambien
  el estado sin una petición expresa del usuario.
- Se permiten lecturas y comprobaciones de compilación.
- Dar instrucciones en pasos pequeños, indicando el archivo exacto.
- Explicar el propósito de cada cambio.
- Si el usuario solicita un archivo completo, proporcionarlo.
- No afirmar que algo se ha verificado si no se ha podido comprobar.
- Si una herramienta falla, comunicarlo sin atribuirlo al proyecto.

## Contexto

- Leer MEMORY.md al comenzar o retomar trabajo.
- Contrastar su contenido con el código y el estado de Git.
- Al cerrar una sesión, proponer una actualización de MEMORY.md
  con avances, comprobaciones y próximos pasos.
- No guardar contraseñas, tokens ni secretos en estos documentos.

## Git

- Mantener la nomenclatura del proyecto:
  feature/..., fix/... y docs/...
- Comprobar la rama y los cambios pendientes antes de comenzar.
- Crear una rama antes de modificar archivos.
- Seleccionar explícitamente los archivos de cada commit.
- No incluir tmp/ sin revisar su contenido.
- No usar push --force ni operaciones destructivas sin autorización.

## Arquitectura

- Monorepo con pnpm.
- apps/web: React, TypeScript, Vite y Tailwind CSS.
- apps/api: Express, TypeScript, Prisma y PostgreSQL.
- packages/shared: esquemas Zod y tipos compartidos.
- Backend organizado en rutas, controladores, servicios y repositorios.
- TanStack Query para datos del servidor.
- Estado local de React para el borrador y la interfaz del editor.

## Comprobaciones

Desde la raíz del proyecto:

- pnpm --filter @orlune/api build
- pnpm --filter @orlune/web build
- pnpm --filter @orlune/web lint

Compilar no sustituye las pruebas del recorrido en el navegador.