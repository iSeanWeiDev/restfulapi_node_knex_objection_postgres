CREATE TYPE "theme_status" AS ENUM (
  'ACTIVATED',
  'SCHEDULED',
  'NOT_READY'
);

CREATE TYPE "webhook_type" AS ENUM (
  'THEME_CREATE',
  'THEME_PUBLISH',
  'THEME_UPDATE'
);

CREATE TYPE "webhook_status" AS ENUM (
  'ACTIVATED',
  'DISABLED'
);

CREATE TABLE "shops" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "themes" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "tags" varchar,
  "shop_id" int NOT NULL,
  "theme_store_id" varchar NOT NULL,
  "status" theme_status,
  "theme_created_at" varchar,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "schedules" (
  "id" SERIAL PRIMARY KEY,
  "start_at" timestamp,
  "shop_id" int NOT NULL,
  "theme_id" int NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "webhooks" (
  "id" SERIAL PRIMARY KEY,
  "shop_id" int NOT NULL,
  "type" webhook_type,
  "status" webhook_status,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

ALTER TABLE "themes" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");

ALTER TABLE "schedules" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");

ALTER TABLE "schedules" ADD FOREIGN KEY ("theme_id") REFERENCES "themes" ("id");

ALTER TABLE "webhooks" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");

