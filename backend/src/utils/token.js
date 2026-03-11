import jwt from "jsonwebtoken";

export const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

export const genearteRefreshToken = async (id) => {
  return await jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5d",
  });
};
