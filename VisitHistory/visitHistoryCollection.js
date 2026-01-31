import mongoose from "mongoose";

const visitHistorySchema = new mongoose.Schema({
  visitId: { type: mongoose.Schema.Types.ObjectId, ref: "Visit", required: true },
  oldStatus: String,
  newStatus: String,
  changedBy: String,
  changedAt: { type: Date, default: Date.now }
});

export const getStatusHistory = async (req, res) => {
  const { id } = req.params;
  const history = await mongoose.model("VisitHistory").find({ visitId: id });
  res.json(history);
};

export default mongoose.model("VisitHistory", visitHistorySchema);
