import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { passwordHashing } from "../utils/hash.js";

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
