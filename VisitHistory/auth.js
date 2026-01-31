// middleware/auth.js
export function requireAuth(req, res, next) {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    next();
  }
  
  export function requireAdmin(req, res, next) {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  }
  