export async function createAuditLog(tx, log) {
  await tx.none(
    `
    INSERT INTO audit_logs (
      id,
      actor_id,
      action,
      entity_type,
      entity_id,
      prev_status,
      new_status,
      reason,
      ip_address,
      created_at
    )
    VALUES (
      gen_random_uuid(),
      $1, $2, 'REQUEST', $3,
      $4, $5, $6, $7, now()
    )
    `,
    [
      log.actorId,
      log.action,
      log.entityId,
      log.prevStatus,
      log.newStatus,
      log.reason || null,
      log.ip
    ]
  );
}
