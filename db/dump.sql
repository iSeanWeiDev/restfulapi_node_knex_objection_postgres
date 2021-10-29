CREATE TYPE "theme_status" AS ENUM (
  'ACTIVATED',
  'SCHEDULED',
  'NOT_READY'
);

CREATE TYPE "trigger_type" AS ENUM (
  'WEBHOOK',
  'SCRIPT_TAG'
);

CREATE TYPE "log_type" AS ENUM (
  'INVALID_HOOK_DATTA',
  'ADD_THEME',
  'EDIT_THEME',
  'DEL_THEME',
  'ADD_SCHEDULE',
  'EDIT_SCHEDULE',
  'DEL_SCHEDULE',
  'ADD_SUBSCRIBE',
  'EDIT_SUBSCRIBE',
  'DEL_SUBSCRIBE',
  'ADD_SUPPORT',
  'EDIT_SUPPORT',
  'DEL_SUPPORT',
  'ADD_WEBHOOK',
  'EDIT_WEBHOOK',
  'DEL_WEBHOOK',
  'ADD_SCRIPT_TAG',
  'EDIT_SCRIPT_TAG',
  'DEL_SCRIPT_TAG'
);

CREATE TYPE "subscribe_keycode" AS ENUM (
  'ANNUAL',
  'QUARTERLY',
  'MONTHLY'
);

CREATE TYPE "subscribe_status" AS ENUM (
  'FREE_TRIAL',
  'SUCCESS',
  'CANCELED',
  'EXPIRED',
  'REFUND'
);

CREATE TABLE "shops" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "access_token" varchar,
  "is_subscribed" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "themes" (
  "id" SERIAL PRIMARY KEY,
  "shop_id" int NOT NULL,
  "name" varchar,
  "desc" varchar,
  "tags" varchar,
  "status" theme_status,
  "api_theme_id" varchar,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "schedules" (
  "id" SERIAL PRIMARY KEY,
  "theme_id" int NOT NULL,
  "start_at" timestamp NOT NULL,
  "end_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "triggers" (
  "id" SERIAL PRIMARY KEY,
  "shop_id" int NOT NULL,
  "api_trigger_id" varchar,
  "type" trigger_type,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "logs" (
  "id" SERIAL PRIMARY KEY,
  "type" log_type,
  "shop_id" int,
  "victim_id" int,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "subscribe_types" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "keycode" subscribe_keycode,
  "price" int,
  "base_price" int,
  "recommended" boolean,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "subscribes" (
  "id" SERIAL PRIMARY KEY,
  "shop_id" int NOT NULL,
  "type_id" int NOT NULL,
  "status" subscribe_status,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

ALTER TABLE "themes" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");

ALTER TABLE "schedules" ADD FOREIGN KEY ("theme_id") REFERENCES "themes" ("id");

ALTER TABLE "triggers" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");

ALTER TABLE "logs" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");

ALTER TABLE "subscribes" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");

ALTER TABLE "subscribes" ADD FOREIGN KEY ("type_id") REFERENCES "subscribe_types" ("id");

