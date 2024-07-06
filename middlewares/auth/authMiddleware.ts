import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { userService } from "../../services/user/userService";
import { UserType } from "../../app/types/userType";
const SECRET_KEY = "ARCHLINUX";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
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

export const validateToken = (req: Request, res: Response): boolean => {
  const jwtToken = req.headers.authorization;
  if (!jwtToken) {
    return false;
  }
  return true;
};

export const getUserFromRequest = async (
  req: Request
): Promise<UserType | null | undefined> => {
  try {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
      throw new Error("Authorization header is missing");
    }

    const token = jwtToken.split(" ")[1];

    const decoded: any = getUserByToken(token);
    const userId = decoded.id;

    const user = await userService.getUserById(userId);

    return user;
  } catch (error) {
    console.error(error);
  }
};
