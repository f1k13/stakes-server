import db from "../../models/db";
import { sports, subSports } from "../../models/schema";
class SportService {
  async generateSports() {
    try {
      const computerGames = await db
        .insert(sports)
        .values({
          name: "Computer games",
        })
        .returning();
      await db
        .insert(subSports)
        .values({
          name: "CS-GO",
          sportId: computerGames[0].id,
        })
        .returning();
      await db
        .insert(subSports)
        .values({
          name: "Dota 2",
          sportId: computerGames[0].id,
        })
        .returning();
      console.log("Mock data created");
      return computerGames[0];
    } catch (error) {
      console.error(error);
    }
  }
}

export const sportService = new SportService();
