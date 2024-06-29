CREATE TABLE IF NOT EXISTS "stakes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	CONSTRAINT "stakes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
