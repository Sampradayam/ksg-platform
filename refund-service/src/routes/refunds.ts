import { Router } from 'express';
import { createRefundHandler, getRefundHandler } from '../controllers/refundsController';

const router = Router();

router.post('/', createRefundHandler);
router.get('/:id', getRefundHandler);

export default router;
