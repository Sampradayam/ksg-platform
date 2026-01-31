export const isValidTransition = (oldStatus, newStatus) => {
  const valid = {
    pending: ["approved", "rejected"],
    approved: ["completed"],
    rejected: [],
    completed: []
  };
  return valid[oldStatus]?.includes(newStatus);
};
