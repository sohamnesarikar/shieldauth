import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { redisClient } from "../config/redisClient.js";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new ApiError(403, "Please login, no token");
    }

    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedData) {
      throw new ApiError(400, "Token expired");
    }

    const cacheUser = await redisClient.get(`user:${decodedData.id}`);

    if (cacheUser) {
      req.user = JSON.parse(cacheUser);
      return next();
    }

    const user = await User.findById(decodedData.id).select("-password");

    if (!user) {
      throw new ApiError(400, "User not found");
    }

    await redisClient.setEx(
      `user:${decodedData.id}`,
      3600,
      JSON.stringify(user),
    );

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
