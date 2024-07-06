import { getUserFromRequest } from "./../../middlewares/auth/authMiddleware";
import { Response, Request } from "express";
import { balanceService } from "../../services/balance/balanceService";

export const updateBalance = async (req: Request, res: Response) => {
  const { money } = req.body;
  const user = await getUserFromRequest(req);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userBalance = await balanceService.updateBalance(user.id, money);
    return res.status(200).json(userBalance);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    console.error(error);
    return res.status(400).json({ message: errorMessage });
  }
};

export const getBalance = async (req: Request, res: Response) => {
  const user = await getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const balance = await balanceService.getBalance(user.id);
    res.status(200).json(balance);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return res.status(400).json({ message: errorMessage });
  }
};
