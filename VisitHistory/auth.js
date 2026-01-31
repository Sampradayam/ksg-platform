export const authMiddleware = (req, res, next) => {
  // For testing, just set req.user
  req.user = { id: "user123" };
  next();
};
