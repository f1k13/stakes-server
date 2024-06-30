import db from "../../models/db";
import { balance } from "../../models/schema";

class BalanceService {
  async createBalance(userId: number, money: string) {
    const result = await db
      .insert(balance)
      .values({
        userId: userId,
        money: money,
      })
      .returning();
    const userMoney = result[0];
    if (!userId) {
      throw new Error("Поле user_id обязательное поле");
    }
    return userMoney;
  }
}

export const balanceService = new BalanceService();
