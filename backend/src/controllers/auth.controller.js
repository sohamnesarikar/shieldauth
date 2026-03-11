import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../utils/mail.js";
import { redisClient } from "../config/redisClient.js";
import { generateOtp } from "../utils/otp.js";
import { genearteRefreshToken, generateToken } from "../utils/token.js";

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

export const verifyEmailController = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(400, "Verification token is required");
  }

  const verifyKey = `verify:${token}`;

  const userDataJSON = await redisClient.get(verifyKey);

  if (!userDataJSON) {
    throw new ApiError(400, "Verification Link is invalid or expired");
  }

  await redisClient.del(verifyKey);

  const userData = JSON.parse(userDataJSON);

  const newUser = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });

  res.status(201).json({
    success: true,
    message: "Email verified successfully, Your account has been created",
    data: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = sanitize(req.body);

  const rateLimitKey = `login-rate-limit:${req.ip}:${email}`;

  if (await redisClient.get(rateLimitKey)) {
    throw new ApiError(429, "Too many requests, try again later");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const otp = generateOtp();

  const otpKey = `otp:${email}`;

  await redisClient.set(otpKey, otp, { EX: 300 });

  const emailSubject = "OTP for verification ✔";
  const emailOtpHTML = `
    <p>Your One-Time Password (OTP) for Signing in your account is:</p>
    <h1>${otp}</h1>
    <p>This OTP is valid for <b>5 minutes</b>. Please do not share this code with anyone.</p>
    <p>If you did not request this verification, you can safely ignore this email.</p>`;

  await sendMail(emailSubject, email, emailOtpHTML);

  await redisClient.set(rateLimitKey, "true", { EX: 60 });

  res.status(200).json({
    success: true,
    message:
      "If your email is valid, an otp has been sent to your email. It will expires in 5 minutes.",
  });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = sanitize(req.body);

  if (!email || !otp) {
    throw new ApiError(400, "Please give all required fields");
  }

  const otpKey = `otp:${email}`;
  const storedOtp = await redisClient.get(otpKey);

  if (!storedOtp) {
    throw new ApiError(400, "Otp expired");
  }

  if (storedOtp !== otp) {
    throw new ApiError(400, "Invalid otp");
  }

  await redisClient.del(otpKey);

  const user = await User.findOne({ email });

  const accessToken = generateToken(user._id);
  const refreshToken = genearteRefreshToken(user._id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false, // later makes true
    sameSite: "strict",
    maxAge: 1000 * 60 * 5, // 5 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
  });

  res.status(200).json({
    success: true,
    message: `Welcome ${user.name}`,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});
