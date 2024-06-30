import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "ARCHLINUX";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const generateToken = (userId: number): string => {
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

export const getUserByToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
