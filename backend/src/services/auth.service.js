import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { comparePassword, passwordHashing } from "../utils/hash.util.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.util.js";

export const registerUserService = async (data) => {
  const { username, email, password } = data;

  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await passwordHashing(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginUserService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  const accessToken = await generateAccessToken({
    id: user._id,
    username: user.username,
  });
  const refreshToken = await generateRefreshToken({
    id: user._id,
    username: user.username,
  });

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};
