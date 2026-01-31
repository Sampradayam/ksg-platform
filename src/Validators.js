// src/validators/tourismVisitRequest.validator.js
import { body } from "express-validator";

export const createTourismVisitRequestValidator = [
  body("fullName").notEmpty(),
  body("email").isEmail(),
  body("phoneNumber").notEmpty(),
  body("preferredVisitDate")
    .isISO8601()
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error();
      }
      return true;
    }),
  body("groupSize").isInt({ min: 1 }),
  body("notes").optional().isLength({ max: 1000 }),
];
