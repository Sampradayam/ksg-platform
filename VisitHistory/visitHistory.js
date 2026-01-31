import VisitHistory from "./visitHistoryCollection";

export const getStatusHistory = async (req, res) => {
  const history = await VisitHistory.find({ visitId: req.params.id })
    .sort({ createdAt: -1 });

  res.json(history);
};
