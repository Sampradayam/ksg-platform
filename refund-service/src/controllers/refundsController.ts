import { Request, Response } from 'express';
import refundService from '../services/refundService';

export const createRefundHandler = async (req: Request, res: Response) => {
  try {
    const { externalId, amount, reason } = req.body;
    if (!externalId || !amount || !reason) {
      return res.status(400).json({ error: 'externalId, amount and reason are required' });
    }

    const refund = await refundService.createRefund({ externalId, amount, reason });
    return res.status(201).json(refund);
  } catch (err: any) {
    if (err.code === 'P2002') {
      // Prisma unique constraint failed - return existing refund
      const existing = await refundService.findByExternalId(req.body.externalId);
      return res.status(200).json(existing);
    }
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

export const getRefundHandler = async (req: Request, res: Response) => {
  try {
    const refund = await refundService.findById(req.params.id);
    if (!refund) return res.status(404).json({ error: 'not_found' });
    return res.json(refund);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

export default { createRefundHandler, getRefundHandler };
