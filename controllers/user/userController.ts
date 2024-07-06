import { Request, Response } from "express";
import { userService } from "../../services/user/userService";
import { getUserFromRequest } from "../../middlewares/auth/authMiddleware";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userService.findUserByUsernameOrEmail(
      username,
      email
    );
    if (existingUser) {
      res.status(400).json({
        message: "Пользователь с таким ником или email уже существует",
      });
      return;
    }
    const user = await userService.registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await userService.loginUser(username, password);
    res.status(200).json(user);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Invalid username or password";
    console.error(error);
    res.status(400).json({ message: errorMessage });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserFromRequest(req);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
