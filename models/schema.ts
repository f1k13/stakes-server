import { sql } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().unique(),
  username: varchar("username", { length: 255 }).notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  startTime: timestamp("start_time").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  sportId: integer("sport_id").references(() => sports.id),
  subSportId: integer("sub_sport_id").references(() => subSports.id),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const odds = pgTable("odds", {
  id: serial("id").primaryKey().unique(),
  eventId: integer("event_id").references(() => events.id),
  type: varchar("type", { length: 50 }).notNull(),
  value: numeric("value", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const bets = pgTable("bets", {
  id: serial("id").primaryKey().unique(),
  userId: integer("user_id").references(() => users.id),
  eventId: integer("event_id").references(() => events.id),
  oddId: integer("odd_id").references(() => odds.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey().unique(),
  userId: integer("user_id").references(() => users.id),
  betId: integer("bet_id").references(() => bets.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const balance = pgTable("balance", {
  id: serial("id").primaryKey().unique(),
  userId: integer("user_id")
    .references(() => users.id)
    .unique(),
  money: numeric("money", { precision: 10, scale: 2 }).notNull(),
});
export const sports = pgTable("sports", {
  id: serial("id").primaryKey().unique(),
  name: varchar("name", { length: 255 }).notNull(),
});
export const subSports = pgTable("sub_sports", {
  id: serial("id").primaryKey().unique(),
  sportId: integer("sport_id").references(() => sports.id),
  name: varchar("name", { length: 255 }).notNull(),
});
