import bcrypt from "bcrypt";
import { sql } from "drizzle-orm";
import {
  generateToken,
  hashPassword,
} from "../../middlewares/auth/authMiddleware";
import db from "../../models/db";
import { users } from "../../models/schema";

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
      return { user, token };
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
  async findUserByUsernameOrEmail(username: string, email: string) {
    try {
      const existingUser = await db
        .select()
        .from(users)
        .where(
          sql`${users.username} = ${username} OR ${users.email} = ${email}`
        );
      console.log(existingUser, "user");
      return existingUser[0];
    } catch (error) {
      console.error("Ошибка при поиске пользователя:", error);
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
    const token = await generateToken(user.id);
    return { user, token };
  }
}

export const userService = new UserService();
