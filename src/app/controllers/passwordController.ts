import bcryptjs from "bcryptjs";

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(saltRounds);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export const checkPassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  const isMatch = await bcryptjs.compare(plainPassword, hashedPassword);
  return isMatch;
};
