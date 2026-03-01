import express from "express";
import { registerController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerUserSchema } from "../validators/user.validator.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerController);

export default router;
