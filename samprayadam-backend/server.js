import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

dotenv.config();

/* -------------------- CONFIG -------------------- */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const REDIS_URL = process.env.REDIS_URL;

/* -------------------- DB -------------------- */
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });

/* -------------------- MODELS -------------------- */
const visitorRequestSchema = new mongoose.Schema(
  {
    visitorId: String,
    email: String,
    phone: String,
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

const notificationLogSchema = new mongoose.Schema(
  {
    requestId: mongoose.Schema.Types.ObjectId,
    channel: String,
    status: String,
    errorMessage: String,
    attempt: Number
  },
  { timestamps: true }
);

const VisitorRequest = mongoose.model("VisitorRequest", visitorRequestSchema);
const NotificationLog = mongoose.model("NotificationLog", notificationLogSchema);

/* -------------------- QUEUE -------------------- */
const redisConnection = new IORedis(REDIS_URL);

const notificationQueue = new Queue("notifications", {
  connection: redisConnection
});

/* -------------------- SERVICES -------------------- */
const sendEmail = async (to, message) => {
  console.log(`Email sent to ${to}: ${message}`);
};

const sendSMS = async (to, message) => {
  console.log(`SMS sent to ${to}: ${message}`);
};

/* -------------------- WORKER -------------------- */
new Worker(
  "notifications",
  async job => {
    const { requestId, status, email, phone } = job.data;

    const message =
      status === "APPROVED"
        ? "Your visit request has been approved."
        : "Your visit request has been rejected.";

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
        throw err;
      }
    }

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
    connection: redisConnection,
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 }
  }
);

/* -------------------- EXPRESS -------------------- */
const app = express();
app.use(express.json());

app.patch("/api/admin/visitor/:requestId", async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  const request = await VisitorRequest.findByIdAndUpdate(
    requestId,
    { status },
    { new: true }
  );

  await notificationQueue.add("send-notification", {
    requestId: request._id,
    status: request.status,
    email: request.email,
    phone: request.phone
  });

  res.json({ success: true, request });
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
