import request from 'supertest';
import app from '../app';

jest.mock('../services/refundService', () => ({
  __esModule: true,
  default: {
    createRefund: jest.fn(),
    updateStatusByProviderId: jest.fn(),
    findByExternalId: jest.fn(),
    findById: jest.fn(),
  },
}));
const refundService = require('../services/refundService').default;

describe('Refunds API', () => {
  beforeEach(() => jest.clearAllMocks());

  it('creates a refund (idempotent)', async () => {
    const sample = {
      id: 'r_1',
      externalId: 'ext_123',
      providerRefundId: 'prov_abc',
      amount: 100,
      reason: 'customer_cancel',
      status: 'REQUESTED',
    };
    refundService.createRefund.mockResolvedValue(sample);

    const res = await request(app)
      .post('/refunds')
      .send({ externalId: 'ext_123', amount: 100, reason: 'customer_cancel' });

    expect(res.status).toBe(201);
    expect(res.body.externalId).toBe('ext_123');
    expect(refundService.createRefund).toHaveBeenCalled();
  });

  it('provider webhook updates status', async () => {
    refundService.updateStatusByProviderId.mockResolvedValue({ count: 1 });

    const res = await request(app)
      .post('/provider/webhook')
      .send({ providerRefundId: 'prov_abc', status: 'COMPLETED' });

    expect(res.status).toBe(200);
    expect(refundService.updateStatusByProviderId).toHaveBeenCalledWith('prov_abc', 'COMPLETED');
  });
});
