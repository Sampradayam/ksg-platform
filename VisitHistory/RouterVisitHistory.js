// routes/visitHistory.js
import express from "express";
import { getVisitHistory } from "../controllers/visitHistoryController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, getVisitHistory);

export default router;
