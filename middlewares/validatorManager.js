import { body } from "express-validator";
import { validationResultExpress } from "./validationResult.js";

export const bodyRegisterValidator = [
  body("email", "Incorrect email format").trim().isEmail().normalizeEmail(),
  body("password", "password too short").trim().isLength({ min: 6 }),
  body("password", "Icorrect password format").custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error("Passwords do not match");
    }
    return value;
  }),
  validationResultExpress,
];

export const bodyLoginValidator = [
  [
    body("email", "Incorrect email format").trim().isEmail().normalizeEmail(),
    body("password", "password too short").trim().isLength({ min: 6 }),
    validationResultExpress,
  ],
];

export const bodyEventValidator = [
  [
    body("title", "Must have title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long")
      .notEmpty(),
    body("type", "Must have type").trim().notEmpty(),

    validationResultExpress,
  ],
];
