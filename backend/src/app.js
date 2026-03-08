import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

export const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);

// error middleware
app.use(globalErrorHandler);
