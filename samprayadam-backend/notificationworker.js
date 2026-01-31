import { Worker } from "bullmq";
import IORedis from "ioredis";
import NotificationLog from "./models/NotificationLog.js";
import { sendEmail, sendSMS } from "./services/notification.service.js";

const connection = new IORedis();

new Worker(
  "notifications",
  async job => {
    const { requestId, status, email, phone } = job.data;
    const message =
      status === "APPROVED"
        ? "Your visit request has been approved."
        : "Your visit request has been rejected.";

    // Email
    if (email) {
      try {
        await sendEmail(email, message);
        await NotificationLog.create({
          requestId,
          channel: "EMAIL",
          status: "SUCCESS",
          attempt: job.attemptsMade + 1
        });
      } catch (err) {
        await NotificationLog.create({
          requestId,
          channel: "EMAIL",
          status: "FAILED",
          errorMessage: err.message,
          attempt: job.attemptsMade + 1
        });
        throw err; // triggers retry
      }
    }

    // SMS
    if (phone) {
      try {
        await sendSMS(phone, message);
        await NotificationLog.create({
          requestId,
          channel: "SMS",
          status: "SUCCESS",
          attempt: job.attemptsMade + 1
        });
      } catch (err) {
        await NotificationLog.create({
          requestId,
          channel: "SMS",
          status: "FAILED",
          errorMessage: err.message,
          attempt: job.attemptsMade + 1
        });
        throw err;
      }
    }
  },
  {
    connection,
    attempts: 3,               // retries
    backoff: { type: "exponential", delay: 5000 }
  }
);
