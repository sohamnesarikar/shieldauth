import express from "express";
import {
  loginController,
  registerController,
  verifyEmailController,
  verifyOtp,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validators/user.validator.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerController);
router.post("/verify/:token", verifyEmailController);
router.post("/login", validate(loginUserSchema), loginController);
router.post("/verify", verifyOtp);

export default router;
