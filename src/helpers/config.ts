import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const DEVELOPMENT = "DEVELOPMENT";
const PRODUCTION = "PRODUCTION";
const TEST = "test";

/*
  Defining schemas
  https://github.com/colinhacks/zod#defining-schemas
*/
const ConfigSchema = z.object({
  NODE_ENV: z.union([
    z.literal(DEVELOPMENT),
    z.literal(PRODUCTION),
    z.literal(TEST),
  ]),
  VITE_IMG_URL: z.string(),
  FETCH_BASE_URL: z.string(),
  FETCH_GET_MATCHES_URL: z.string(),
  FETCH_GET_ALL_COMPETITIONS_URL: z.string(),
  FETCH_GET_STANDING_URL: z.string(),
  FETCH_GET_COMPETITION_URL: z.string(),
  BOT_TOKEN: z.string().nonempty(),
  BOT_WEBHOOK_URL: z.string(),
  SERVER_PORT: z.number(),
  BOT_PORT: z.number(),
  BOT_API_ROOT: z.string().optional(),
  MONGO: z.string(),
  API_URL: z.string(),
  WEB_URL: z.string(),
  API_KEY_YOTUBE: z.string(),
  ID_CHANNELS: z.string(),
  LOG_LEVEL: z.union([
    z.literal("fatal"),
    z.literal("error"),
    z.literal("warn"),
    z.literal("info"),
    z.literal("debug"),
    z.literal("trace"),
    z.literal("silent"),
  ]),
  isProduction: z.boolean(),
  isDevelopment: z.boolean(),
  isTest: z.boolean(),
});

export default ConfigSchema.parse({
  ...process.env,
  SERVER_PORT: parseInt(process.env.SERVER_PORT || '4000'),
  BOT_PORT: parseInt(process.env.BOT_PORT || '3000'),
  isProduction: process.env.NODE_ENV === 'PRODUCTION',
  isDevelopment: process.env.NODE_ENV === 'DEVELOPMENT',
  isTest: process.env.NODE_ENV === TEST,
});
