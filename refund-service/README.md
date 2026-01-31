# Refund Service (Node.js + TypeScript)

This small microservice demonstrates a Refund API with provider calls, webhook status sync, and idempotency to prevent double refunds.

Features
- Create refund with `externalId` (idempotency key), `amount`, and `reason`
- Provider refund API call (configurable via `PROVIDER_URL`)
- Webhook endpoint to accept provider status updates
- Prevent double refunds via `externalId` uniqueness and idempotent logic

Quick start
1. Copy `.env.example` -> `.env` and set `DATABASE_URL`.
2. Install deps: `npm install`
3. Generate Prisma client: `npx prisma generate`
4. Run migrations: `npx prisma migrate dev --name init`
5. Start service: `npm run dev`

Tests
- `npm test` (uses Jest; some tests mock Prisma and the provider client)

Design notes
- `Refund` model stores `externalId`, `providerRefundId`, `amount`, `reason`, and `status`.
- Idempotency is implemented by checking `externalId` and database unique constraint.
- Provider is configurable; for quick local testing a mock provider endpoint is included.

