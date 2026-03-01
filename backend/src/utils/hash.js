import bcrypt from "bcryptjs";

export const passwordHashing = async (password) => {
  const saltRound = 10;
  return bcrypt.hash(password, saltRound);
};
