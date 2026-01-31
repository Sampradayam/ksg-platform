import axios from 'axios';

const PROVIDER_URL = process.env.PROVIDER_URL || 'http://localhost:4000/_mock/provider';

interface ProviderResponse {
  providerRefundId: string;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
}

const createRefund = async ({ amount, externalId }: { amount: number; externalId: string }): Promise<ProviderResponse> => {
  const resp = await axios.post(`${PROVIDER_URL}/refunds`, { amount, externalId });
  return resp.data;
};

export default { createRefund };
