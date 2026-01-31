// routes/visits.js
import express from "express";
import { updateVisitStatus } from "../controllers/visitController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.patch("/:visitId/status", requireAuth, requireAdmin, updateVisitStatus);

export default router;
