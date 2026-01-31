import { Router } from 'express';
import approvalRoutes from '../modules/approval/approval.routes.js';

const router = Router();

router.use('/admin/approvals', approvalRoutes);

export default router;
