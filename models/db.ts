import dotenv from "dotenv";

dotenv.config();

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

const dbConfig = {
  dialect: "postgres",
  host: PG_HOST,
  port: parseInt(PG_PORT as string, 10),
  database: PG_DATABASE,
  username: PG_USER,
  password: PG_PASSWORD,
};
