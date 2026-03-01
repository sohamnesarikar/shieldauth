import {
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const registerController = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

export const loginController = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginUserService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 5,
  });

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
    refreshToken,
  });
});
