import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../utils/mail.js";
import { redisClient } from "../config/redisClient.js";

export const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = sanitize(req.body);

  const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;

  if (await redisClient.get(rateLimitKey)) {
    throw new ApiError(429, "Too many requests, try again later");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  // password hasing
  const hashedPassword = await bcrypt.hash(password, 10);

  // genarate verify token
  const verifyEmailToken = crypto.randomBytes(32).toString("hex");
  const verifyKey = `verify:${verifyEmailToken}`;

  const dataToStore = JSON.stringify({ name, email, password: hashedPassword });

  // store data in redis for 5 minutes
  await redisClient.set(verifyKey, dataToStore, { EX: 300 });

  const emailSubject = "Verify your Email Address ✔";
  const emailVeificationHTML = `<p>Welcome, your account has been created. Please verify your email by clicking this following link <a href="${process.env.FRONTEND_URL}/token/${verifyEmailToken}">Verify Email</a></p>
    <p>This verification link expires in <b>5 minutes</b>. Please do not share this code with anyone for security reasons.</p>`;

  await sendMail(emailSubject, email, emailVeificationHTML);

  // set rate limit for verification email link
  await redisClient.set(rateLimitKey, "true", { EX: 60 });

  res.status(200).json({
    success: true,
    message:
      "If your email is valid, a verification link has been sent to your email. It will expires in 5 minutes.",
  });
});

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  const accessToken = await user.generateAccessToken({
    id: user._id,
    name: user.name,
  });
  const refreshToken = await user.generateRefreshToken({
    id: user._id,
    name: user.name,
  });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false, // later makes true
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // later makes true
    maxAge: 1000 * 60 * 60 * 24 * 5,
  });

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  });
});
