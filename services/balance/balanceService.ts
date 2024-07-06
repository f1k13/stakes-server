import { sql } from "drizzle-orm";
import db from "../../models/db";
import { balance } from "../../models/schema";

class BalanceService {
  async updateBalance(userId: number, money: string) {
    if (!userId) {
      throw new Error("Поле user_id обязательно");
    }
    await db
      .update(balance)
      .set({ money: money })
      .where(sql`${balance.userId} = ${userId}`);
    const updatedBalance = await db
      .select()
      .from(balance)
      .where(sql`${balance.userId} = ${userId}`);
    return updatedBalance[0];
  }
  async getBalance(userId: number) {
    if (!userId) {
      throw new Error("Поле user_id обязательно");
    }
    const result = await db
      .select()
      .from(balance)
      .where(sql`${balance.userId} = ${userId}`);
    return result[0];
  }
}

export const balanceService = new BalanceService();
