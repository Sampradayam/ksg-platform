import express from "express";
import { authMiddleware } from "./auth.js";
import { createVisit, getVisitHistory, updateVisitStatus } from "./visitController.js"; // .js
import { getStatusHistory } from "./visitHistoryCollection.js"; // .js

const router = express.Router();
router.post("/visit", authMiddleware, createVisit);
router.get("/visit-history", authMiddleware, getVisitHistory);
router.put("/visit/:id/status", authMiddleware, updateVisitStatus);
router.get("/visit/:id/history", authMiddleware, getStatusHistory);

export default router;
