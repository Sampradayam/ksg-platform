import Visit from "./visit.js";
import VisitHistory from "./visitHistoryCollection.js";
import { isValidTransition } from "./statusTransistions.js";

export const createVisit = async (req, res) => {
  const visit = await Visit.create(req.body);
  res.status(201).json(visit);
};

export const getVisitHistory = async (req, res) => {
  const history = await Visit.find().sort({ createdAt: -1 });
  res.json(history);
};

export const updateVisitStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const visit = await Visit.findById(id);
  if (!visit) return res.status(404).json({ message: "Visit not found" });

  if (!isValidTransition(visit.status, status)) {
    return res.status(400).json({ message: "Invalid status transition" });
  }

  await VisitHistory.create({
    visitId: visit._id,
    oldStatus: visit.status,
    newStatus: status,
    changedBy: req.user.id
  });

  visit.status = status;
  await visit.save();

  res.json(visit);
};
