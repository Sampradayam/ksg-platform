// controllers/visitHistoryController.js
import VisitHistory from "../models/VisitHistory.js";

export async function getVisitHistory(req, res) {
  const query = {};

  if (req.user.role === "tourist") {
    query.touristId = req.user.id;
  } else if (req.query.touristId) {
    query.touristId = req.query.touristId;
  }

  if (req.query.visitId) query.visitId = req.query.visitId;
  if (req.query.status) query.status = req.query.status;
  if (req.query.from || req.query.to) {
    query.changedAt = {};
    if (req.query.from) query.changedAt.$gte = new Date(req.query.from);
    if (req.query.to) query.changedAt.$lte = new Date(req.query.to);
  }

  const history = await VisitHistory.find(query).sort({ changedAt: 1 });
  res.json(history);
}
