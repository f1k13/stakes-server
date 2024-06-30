import { Response, Request } from "express";
import { balanceService } from "../../services/balance/balanceService";

export const createBalance = async (req: Request, res: Response) => {
  const { userId, money } = req.body;

  try {
    const userBalance = await balanceService.createBalance(userId, money);
    return userBalance;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    console.error(error);
    res.status(400).json({ message: errorMessage });
  }
};
