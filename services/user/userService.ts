import bcrypt from "bcrypt";
import { sql } from "drizzle-orm";
import {
  generateToken,
  hashPassword,
} from "../../middlewares/auth/authMiddleware";
import db from "../../models/db";
import { balance, users } from "../../models/schema";

class UserService {
  async registerUser(username: string, email: string, password: string) {
    try {
      const result = await db
        .insert(users)
        .values({
          username: username,
          email: email,
          password: await hashPassword(password),
        })
        .returning();
      const user = result[0];
      const token = generateToken(user.id);
      await db
        .insert(balance)
        .values({
          userId: user.id,
          money: "0.00",
        })
        .returning();
      return { user, token };
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async loginUser(username: string, password: string) {
    const result = await db
      .select()
      .from(users)
      .where(sql`${users.username} = ${username}`);
    const user = result[0];
    const validatePassword = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new Error("Пользователь не найден");
    }
    if (!validatePassword) {
      throw new Error("Пароль не правильный");
    }
    const token = generateToken(user.id);
    return { user, token };
  }
  async findUserByUsernameOrEmail(username: string, email: string) {
    try {
      const existingUser = await db
        .select()
        .from(users)
        .where(
          sql`${users.username} = ${username} OR ${users.email} = ${email}`
        );
      return existingUser[0];
    } catch (error) {
      console.error("Ошибка при поиске пользователя:", error);
      throw error;
    }
  }
  async getUserById(userId: number) {
    try {
      const user = await db
        .select()
        .from(users)
        .where(sql`${users.id} = ${userId}`);
      return user[0];
    } catch (error) {
      console.error(error);
    }
  }
}

export const userService = new UserService();
