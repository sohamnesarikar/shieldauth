import { ApiError } from "../utils/ApiError.js";

export const home = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  res.json({
    success: true,
    data: user,
  });
});
