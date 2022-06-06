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
  BOT_TOKEN: z.string().nonempty(),
  BOT_WEBHOOK_URL: z.string(),
  // BOT_WEBHOOK_PATH: z.string(),
  // BOT_HOST: z.string(),
  BOT_PORT: z.number(),
  BOT_API_ROOT: z.string().optional(),
  MONGO: z.string(),
  API_URL: z.string(),
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
  BOT_PORT: parseInt(process.env.BOT_PORT || '3000'),
  isProduction: process.env.NODE_ENV === 'PRODUCTION',
  isDevelopment: process.env.NODE_ENV === 'DEVELOPMENT',
  isTest: process.env.NODE_ENV === TEST,
});
