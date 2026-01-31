// notificationWorker.js
import { notificationQueue } from "./queue.js";
import { logNotification } from "./notificationLog.js";

notificationQueue.process(async (job) => {
  const { type, message } = job.data;

  // You can integrate email / push notification here
  console.log(`[Notification Worker] Type: ${type} | Message: ${message}`);

  // Save to log
  logNotification(message);

  return Promise.resolve();
});
