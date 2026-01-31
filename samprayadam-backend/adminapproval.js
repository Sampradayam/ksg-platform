import VisitorRequest from "../models/VisitorRequest.js";
import { notificationQueue } from "../queue.js";

export const updateRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body; // APPROVED or REJECTED

  const request = await VisitorRequest.findByIdAndUpdate(
    requestId,
    { status },
    { new: true }
  );

  // Emit async event
  await notificationQueue.add("send-notification", {
    requestId: request._id,
    status: request.status,
    email: request.email,
    phone: request.phone
  });

  // Immediate response (non-blocking)
  res.json({ success: true, request });
};
