// notificationLog.js
import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "notification_log.txt");

export const logNotification = (message) => {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFile, logMessage, "utf-8");
};
