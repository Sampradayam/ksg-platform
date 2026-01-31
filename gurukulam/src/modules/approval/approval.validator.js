export function validateDecision(decision, reason) {
  if (!['APPROVED', 'REJECTED'].includes(decision)) {
    throw new Error('Invalid decision');
  }

  if (decision === 'REJECTED' && !reason) {
    throw new Error('Rejection reason is required');
  }
}
