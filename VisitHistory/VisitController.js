// controllers/visitController.js
import Visit from "../models/Visit.js";
import VisitHistory from "../models/VisitHistory.js";
import { validateStatusTransition } from "../utils/statusTransitions.js";

export async function updateVisitStatus(req, res) {
  const { visitId } = req.params;
  const { status, reason } = req.body;

  const visit = await Visit.findById(visitId);
  if (!visit) return res.status(404).json({ message: "Visit not found" });

  validateStatusTransition(visit.currentStatus, status);

  visit.currentStatus = status;
  await visit.save();

  await VisitHistory.create({
    visitId: visit._id,
    touristId: visit.touristId,
    status,
    actor: {
      type: req.user.role === "admin" ? "ADMIN" : "SYSTEM",
      id: req.user.role === "admin" ? req.user.id : null
    },
    reason,
    metadata: {
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    }
  });

  res.json({ success: true });
}
