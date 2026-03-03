import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../utils/mail.js";
import { generateOtp } from "../utils/otp.js";

export const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const otp = generateOtp();
  const otpExpireTime = Date.now() + 1000 * 60 * 5; // 5 minutes

  user.verifyEmailOtp = otp;
  user.verifyEmailOtpExpiry = otpExpireTime;
  await user.save();

  await sendMail(user, otp);

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
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
