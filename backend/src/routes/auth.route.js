import express from "express";
import {
  registerController,
  verifyEmailController,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerUserSchema } from "../validators/user.validator.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerController);

router.post("/verify/:token", verifyEmailController);

export default router;
