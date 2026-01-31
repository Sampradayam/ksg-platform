export function validateTransition(currentStatus, nextStatus) {
  if (currentStatus !== 'PENDING') {
    throw new Error('Request already finalized');
  }

  if (!['APPROVED', 'REJECTED'].includes(nextStatus)) {
    throw new Error('Invalid status transition');
  }
}
