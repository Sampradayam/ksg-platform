// src/app.js
import express from "express";
import tourismVisitRequestRoutes from "./routes/tourismVisitRequest.routes.js";

const app = express();

app.use(express.json());
app.use("/api/visit-requests", tourismVisitRequestRoutes);

export default app;
