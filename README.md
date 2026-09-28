# Norte Estudio Ecommerce

Monorepo ecommerce en TypeScript, con tienda Next.js, API NestJS, PostgreSQL y Prisma.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Docker Desktop para ejecutar PostgreSQL localmente

## Instalación

```powershell
npm install
Copy-Item .env.example .env
docker compose up -d postgres
npm run db:generate
npm run db:migrate
```

## Desarrollo

```powershell
npm run dev
```

La tienda está disponible en `http://localhost:3000` y la API en `http://localhost:4000/api`. El endpoint `GET /api/health` comprueba el estado de la API; `GET /api/products` lista productos.

## Estructura

```text
apps/
  api/                 API REST NestJS, separada en módulos de dominio
  storefront/          Tienda Next.js App Router
packages/
  database/            Esquema Prisma y comandos de persistencia
  shared/              Contratos TypeScript compartidos
docker-compose.yml     PostgreSQL local
```

Los precios de la API se expresan en unidades menores (céntimos). El carrito y la creación de pedidos de esta base son demostrativos; integra persistencia y un proveedor de pagos antes de producción.

## Comandos útiles

- `npm run build`: compila API y tienda.
- `npm run lint`: ejecuta los linters de las aplicaciones.
- `npm test`: ejecuta las pruebas unitarias de la API.
- `npm run test:e2e`: prueba los endpoints HTTP y el flujo de pedidos.
- `npm run db:generate`: genera Prisma Client.
- `npm run db:migrate`: aplica migraciones locales.
- `npm run db:studio`: abre Prisma Studio.
