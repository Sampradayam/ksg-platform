// src/routes/tourismVisitRequest.routes.js
import express from "express";
import { authenticate } from "../middleware/auth.js";
import { createTourismVisitRequest } from "../controllers/tourismVisitRequest.controller.js";
import { createTourismVisitRequestValidator } from "../validators/tourismVisitRequest.validator.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  createTourismVisitRequestValidator,
  createTourismVisitRequest
);

export default router;
