// notificationServer.js
import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
export const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

export const sendNotification = (message) => {
  io.emit("notification", message);
};

server.listen(5000, () => console.log("Notification Socket.IO running on 5000"));
