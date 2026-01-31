import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import visitHistoryRoutes from "./routerVisitHistory.js"; // correct import path

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api", visitHistoryRoutes);

app.get("/", (req, res) => {
  res.send("Visit History Backend is running!");
});

// DB + server
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/visitHistoryDB")
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB connection error:", err));

export default app;
