// adminApproval.js
import { notificationQueue } from "./queue.js";

export const approveTask = async (taskId, userId) => {
  // Push a notification job to the queue
  await notificationQueue.add({
    type: "TASK_APPROVED",
    taskId,
    userId,
    message: `Task ${taskId} has been approved for user ${userId}`,
  });

  return { message: "Notification triggered successfully" };
};
