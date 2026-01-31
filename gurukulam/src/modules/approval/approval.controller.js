import { decideRequest } from './approval.service.js';

export async function decide(req, res, next) {
  try {
    const result = await decideRequest({
      requestId: req.params.id,
      decision: req.body.decision,
      reason: req.body.reason,
      adminId: req.user.id,
      ip: req.ip
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}
