import { Router } from 'express';
import axios from 'axios';
const router = Router();

// simple in-process mock provider
router.post('/refunds', async (req, res) => {
  const { amount, externalId } = req.body;
  // create a providerRefundId
  const providerRefundId = `prov_${Math.random().toString(36).slice(2, 9)}`;

  // respond immediately
  res.json({ providerRefundId, status: 'PROCESSING' });

  // simulate async processing and send webhook back to our service
  setTimeout(async () => {
    try {
      await axios.post(`${process.env.PROVIDER_WEBHOOK_URL || 'http://localhost:4000'}/provider/webhook`, {
        providerRefundId,
        status: 'COMPLETED',
      });
    } catch (err: any) {
      console.error('failed to send webhook to app', err?.message ?? err);
    }
  }, 1000);
});

export default router;
