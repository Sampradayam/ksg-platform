import { Router, Request, Response } from 'express';
import refundService from '../services/refundService';

const router = Router();

// Provider posts updates here
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const { providerRefundId, status } = req.body;
    if (!providerRefundId || !status) return res.status(400).json({ error: 'providerRefundId and status required' });

    await refundService.updateStatusByProviderId(providerRefundId, status);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

export default router;
