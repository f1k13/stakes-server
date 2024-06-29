import "dotenv/config";
import db from "./db";
import { migrate } from "drizzle-orm/postgres-js/migrator";

async function migrateData(): Promise<void> {
  await migrate(db, { migrationsFolder: "./drizzle" });
  process.exit(0);
}
migrateData();
