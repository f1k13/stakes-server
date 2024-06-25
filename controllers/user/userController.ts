import { Request, Response } from "express";
import { userService } from "../../services/user/userService";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password, email } = req.body;

  try {
    const user = userService.registerUser(username, password, email);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
