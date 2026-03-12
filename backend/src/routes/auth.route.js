import express from "express";
import {
  home,
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
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerController);
router.get("/verify/:token", verifyEmailController);
router.post("/login", validate(loginUserSchema), loginController);
router.post("/verify", verifyOtp);
router.get("/home", authMiddleware, home);

export default router;
