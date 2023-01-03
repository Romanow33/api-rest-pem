import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/auth.controller.js";
import { validationResultExpress } from "../middlewares/validationResult.js";

const router = Router();

router.post(
  "/register",
  [
    body("email", "Incorrect email format").trim().isEmail().normalizeEmail(),
    body("password", "password too short").trim().isLength({ min: 6 }),
    body("password", "Icorrect password format").custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Passwords do not match");
      }
      return value;
    }),
  ],
  validationResultExpress,
  register
);

router.post(
  "/login",
  [
    body("email", "Incorrect email format").trim().isEmail().normalizeEmail(),
    body("password", "password too short").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

export default router;
