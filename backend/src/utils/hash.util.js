import bcrypt from "bcryptjs";

export const passwordHashing = async (password) => {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
