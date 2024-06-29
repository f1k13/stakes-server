import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
dotenv.config();

const client = new pg.Client({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

client
  .connect()
  .then(() => {
    console.log("DB connect");
  })
  .catch((err) => {
    console.log(err, "db failed");
  });

const db = drizzle(client);

export default db;
