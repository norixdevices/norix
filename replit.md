# NORIX Medical Devices

A responsive NORIX medical-device website with a searchable product catalog, public support and enquiry flows, persistent content administration, and secure admin access.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server on the configured `PORT`
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- `pnpm --filter @workspace/api-server run seed` — add missing NORIX starter content
- `pnpm --filter @workspace/api-server run typecheck` — API server typecheck
- `pnpm --filter @workspace/norix run typecheck` — website typecheck
- `pnpm --filter @workspace/norix run build` — website production build

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/norix/` — public website and protected admin UI
- `artifacts/api-server/` — catalog, enquiry, content-management and storage API
- `lib/api-spec/openapi.yaml` — source API contract
- `lib/db/src/schema/` — PostgreSQL/Drizzle schema
- `docs/SETUP.md` — initial administrator, storage, email, database and launch setup

## Architecture decisions

- Clerk authenticates administrators; server routes separately allowlist Clerk user IDs through `NORIX_ADMIN_USER_IDS`.
- Public catalog records are database-driven; only two products from supplied imagery are seeded, without unverified specifications.
- Uploaded documents remain private until an associated resource record is published.
- Optional email delivery never blocks the database-backed enquiry submission.

## Product

NORIX visitors can browse verified products, search product resources, submit contact/support/partner enquiries, and access published documents. Allowlisted administrators can manage products, categories, FAQs, resources, site content and private enquiries.

## Gotchas

- An empty `NORIX_ADMIN_USER_IDS` intentionally denies all admin requests.
- Admin privileges do not come from signing in; allowlist a trusted Clerk account explicitly.
- Privacy/Terms starter copy and product documentation require owner review before launch.
- App Storage uploads require a signed-in, allowlisted admin and the API server's Clerk middleware.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
