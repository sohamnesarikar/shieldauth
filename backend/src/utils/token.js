import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError.js";
import { redisClient } from "../config/redisClient.js";

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
};

export const genearteRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = async (refreshToken, next) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded) {
      throw new ApiError(400, "invalid refresh token");
    }

    const refreshTokenKey = `refresh_token:${decoded.id}`;
    const storedToken = await redisClient.get(refreshTokenKey);

    if (storedToken === refreshToken) {
      return decoded;
    }
    return null;
  } catch (error) {
    next(error);
  }
};

export const rovkeRefreshToken = async (userId) => {
  await redisClient.del(`refresh_token:${userId}`);
};
