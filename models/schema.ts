import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().unique(),
  username: varchar("username", { length: 255 }).notNull(),
  email: text("email").notNull(),
});

export const stakes = pgTable("stakes", {
  id: serial("id").primaryKey().unique(),
  userId: serial("user_id"),
});
