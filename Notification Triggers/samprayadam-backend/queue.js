// queue.js
import Queue from "bull";
import dotenv from "dotenv";

dotenv.config();

// Redis-based queue
export const notificationQueue = new Queue("notificationQueue", {
  redis: { port: 6379, host: "127.0.0.1" }, // Redis server
});
