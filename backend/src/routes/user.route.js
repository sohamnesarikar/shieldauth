import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { home } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/home", authMiddleware, home);

export default router;
