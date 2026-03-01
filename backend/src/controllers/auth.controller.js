import { registerUserService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
