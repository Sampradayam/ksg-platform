// src/controllers/tourismVisitRequest.controller.js
import { validationResult } from "express-validator";
import TourismVisitRequest from "../models/tourismVisitRequest.model.js";

export const createTourismVisitRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName,
    email,
    phoneNumber,
    preferredVisitDate,
    groupSize,
    notes,
  } = req.body;

  const visitRequest = await TourismVisitRequest.create({
    user: req.user.id,
    fullName,
    email,
    phoneNumber,
    preferredVisitDate,
    groupSize,
    notes,
  });

  res.status(201).json(visitRequest);
};
