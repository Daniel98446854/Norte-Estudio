# Project instructions

- Keep the monorepo organized by application in `apps/` and reusable contracts or infrastructure in `packages/`.
- Keep API features isolated in NestJS domain modules under `apps/api/src/modules/`.
- Use TypeScript and validate request DTOs at the API boundary.
- Keep database schema changes in `packages/database/prisma/schema.prisma`.
- Use Spanish for storefront-facing copy and keep secrets out of committed files.
- Run `npm run build` before considering a change complete.
