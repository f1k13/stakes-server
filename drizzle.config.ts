import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.POSTGRES_HOST;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;
const port = process.env.POSTGRES_PORT
  ? parseInt(process.env.POSTGRES_PORT, 10)
  : undefined;

if (!host || !user || !password || !database || isNaN(port ? port : 0)) {
  throw new Error(
    "One or more database configuration environment variables are missing or invalid."
  );
}

export default defineConfig({
  schema: "./models/schema.ts",
  out: "drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host,
    user,
    password,
    database,
    port,
  },
});
