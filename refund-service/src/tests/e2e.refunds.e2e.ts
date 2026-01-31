import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import { execSync } from 'child_process';
import request from 'supertest';

jest.setTimeout(120_000);

let container: StartedTestContainer | null = null;

describe('E2E Refunds (with real Postgres)', () => {
  let server: any;
  let app: any;
  beforeAll(async () => {
    // Start Postgres container
    try {
      container = await new GenericContainer('postgres:15')
        .withEnvironment({ POSTGRES_USER: 'postgres', POSTGRES_PASSWORD: 'password', POSTGRES_DB: 'refund_db' })
        .withExposedPorts(5432)
        .withWaitStrategy(Wait.forLogMessage('database system is ready to accept connections'))
        .start();
    } catch (err) {
      // Docker not available -> skip E2E
      console.warn('Docker unreachable, skipping E2E tests:', err instanceof Error ? err.message : err);
      container = null;
      return;
    }

    if (!container) return;

    const host = container!.getHost();
    const port = container!.getMappedPort(5432);

    // Set DB URL for Prisma
    const dbUrl = `postgresql://postgres:password@${host}:${port}/refund_db`;
    process.env.DATABASE_URL = dbUrl;

    // Generate client and push schema (no migrations needed for e2e)
    execSync('npx prisma generate', { stdio: 'inherit' });
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });

    // Start the app on an ephemeral port so provider mock can call back
    process.env.PORT = '0';

    // Import app after env vars are set
    app = require('../app').default;
    const srv = app.listen(0);

    await new Promise<void>((resolve) => srv.on('listening', () => resolve()));
    server = srv;

    const address: any = server.address();
    const appPort = address.port;

    // Ensure provider URL and webhook target point to this app
    process.env.PROVIDER_URL = `http://localhost:${appPort}/_mock/provider`;
    process.env.PROVIDER_WEBHOOK_URL = `http://localhost:${appPort}`;
  });

  afterAll(async () => {
    if (container) await container.stop();
    if (server) await new Promise<void>((resolve, reject) => server.close((err: any) => (err ? reject(err) : resolve())));
  });

  it('creates a refund and provider webhook updates status to COMPLETED', async () => {
    if (!container) {
      return expect(true).toBe(true); // skipped
    }

    const res = await request(app)
      .post('/refunds')
      .send({ externalId: 'e2e_1', amount: 123.45, reason: 'user_request' })
      .expect(201);

    expect(res.body.externalId).toBe('e2e_1');

    // wait for provider webhook to process (mock uses 1s delay)
    const refundId = res.body.id;

    // poll for up to 5s
    const start = Date.now();
    let status = res.body.status;
    while (Date.now() - start < 5000 && status !== 'COMPLETED') {
      const get = await request(app).get(`/refunds/${refundId}`);
      status = get.body.status;
      if (status === 'COMPLETED') break;
      await new Promise((r) => setTimeout(r, 400));
    }

    expect(status).toBe('COMPLETED');
  });
});
