import db from '../../config/database.js';
import { validateTransition } from './approval.status.js';
import { validateDecision } from './approval.validator.js';
import { createAuditLog } from '../audit/audit.service.js';

export async function decideRequest(data) {
  const { requestId, decision, reason, adminId, ip } = data;

  validateDecision(decision, reason);

  return db.transaction(async (tx) => {
    const request = await tx.one(
      'SELECT status FROM requests WHERE id=$1 FOR UPDATE',
      [requestId]
    );

    validateTransition(request.status, decision);

    await tx.none(
      `UPDATE requests
       SET status=$1,
           rejection_reason=$2,
           updated_at=now()
       WHERE id=$3`,
      [decision, decision === 'REJECTED' ? reason : null, requestId]
    );

    await createAuditLog(tx, {
      actorId: adminId,
      action: decision,
      entityId: requestId,
      prevStatus: request.status,
      newStatus: decision,
      reason,
      ip
    });

    return { message: `Request ${decision.toLowerCase()} successfully` };
  });
}
