import { GenericContainer } from 'testcontainers';
import { execSync } from 'child_process';
import request from 'supertest';

jest.setTimeout(30000);

let hasDocker = true;
try {
  execSync('docker info', { stdio: 'ignore' });
} catch (err) {
  // err may be an Error-like object (unknown); cast to any for diagnostic safety
  const errMsg = (err as any)?.message ?? err;
  console.warn('Docker unreachable, skipping E2E tests:', errMsg);
  hasDocker = false;
}

const describeIfDocker = hasDocker ? describe : describe.skip;

describeIfDocker('Refunds E2E', () => {
  let container: any | null = null;
  let server: any;
  let app: any;

  beforeAll(async () => {
    // Start Postgres container
    container = await (new GenericContainer('postgres:15') as any)
      .withEnvironment({ POSTGRES_DB: 'refund_test', POSTGRES_USER: 'postgres', POSTGRES_PASSWORD: 'password' })
      .withExposedPorts(5432)
      .start();

    const host = (container as any).getHost();
    const port = (container as any).getMappedPort(5432);
    const url = `postgresql://postgres:password@${host}:${port}/refund_test`;

    process.env.DATABASE_URL = url;

    // Push schema to the test DB
    execSync('npx prisma db push', { stdio: 'inherit' });

    // Import app AFTER setting DATABASE_URL so prisma picks it up
    app = require('../../../src/app').default;

    // Start server on ephemeral port
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => resolve());
    });

    const address: any = server.address();
    const base = `http://localhost:${address.port}`;

    // Ensure provider mock will call back to this server
    process.env.PROVIDER_WEBHOOK_URL = base;
    process.env.PROVIDER_URL = `${base}/_mock/provider`;
    process.env.APP_BASE_URL = base;
  });

  afterAll(async () => {
    if (server) await new Promise((res) => server.close(res));
    if (container) await container.stop();
  });

  it('creates a refund and receives provider webhook update', async () => {
    const createRes = await request(process.env.APP_BASE_URL)
      .post('/refunds')
      .send({ externalId: 'e2e-1', amount: 123, reason: 'e2e_test' });

    expect(createRes.status).toBe(201);
    expect(createRes.body.externalId).toBe('e2e-1');
    const id = createRes.body.id;

    // Wait until the mock provider sends webhook and our refund status becomes COMPLETED
    let status = createRes.body.status;
    const maxAttempts = 10;
    let attempts = 0;
    while (status !== 'COMPLETED' && attempts < maxAttempts) {
      await new Promise((r) => setTimeout(r, 600));
      const poll = await request(process.env.APP_BASE_URL).get(`/refunds/${id}`);
      status = poll.body.status;
      attempts += 1;
    }

    expect(status).toBe('COMPLETED');
  });
});
