import db from "../../models/db";
import { users } from "../../models/schema";

class UserService {
  async registerUser(username: string, email: string) {
    try {
      const result = await db
        .insert(users)
        .values({
          username: username,
          email: email,
        })
        .returning();

      const user = result[0];
      return user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
