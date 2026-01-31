import { Router } from 'express';
import auth from '../../middleware/auth.middleware.js';
import admin from '../../middleware/admin.middleware.js';
import { decide } from './approval.controller.js';

const router = Router();

router.post('/:id/decision', auth, admin, decide);

export default router;
