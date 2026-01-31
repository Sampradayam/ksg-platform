// utils/statusTransitions.js
export const ALLOWED_TRANSITIONS = {
    REQUESTED: ["APPROVED", "CANCELLED"],
    APPROVED: ["COMPLETED", "CANCELLED"],
    COMPLETED: [],
    CANCELLED: []
  };
  
  export function validateStatusTransition(from, to) {
    if (!ALLOWED_TRANSITIONS[from]?.includes(to)) {
      throw new Error(`Invalid status transition from ${from} to ${to}`);
    }
  }
  