export const validateRequest = (data) => {
  if (!data.name || !data.email || !data.date) return false;
  return true;
};
