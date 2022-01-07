"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const zod_1 = require("zod");
dotenv.config();
const DEVELOPMENT = "development";
const PRODUCTION = "production";
const TEST = "test";
/*
  Defining schemas
  https://github.com/colinhacks/zod#defining-schemas
*/
const ConfigSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.union([
        zod_1.z.literal(DEVELOPMENT),
        zod_1.z.literal(PRODUCTION),
        zod_1.z.literal(TEST),
    ]),
    BOT_TOKEN: zod_1.z.string().nonempty(),
    BOT_WEBHOOK_URL: zod_1.z.string(),
    BOT_WEBHOOK_PATH: zod_1.z.string(),
    BOT_HOST: zod_1.z.string(),
    BOT_PORT: zod_1.z.number(),
    BOT_API_ROOT: zod_1.z.string().optional(),
    LOG_LEVEL: zod_1.z.union([
        zod_1.z.literal("fatal"),
        zod_1.z.literal("error"),
        zod_1.z.literal("warn"),
        zod_1.z.literal("info"),
        zod_1.z.literal("debug"),
        zod_1.z.literal("trace"),
        zod_1.z.literal("silent"),
    ]),
    isProduction: zod_1.z.boolean(),
    isDevelopment: zod_1.z.boolean(),
    isTest: zod_1.z.boolean(),
});
let config;
try {
    config = ConfigSchema.parse({
        ...process.env,
        BOT_PORT: parseInt(process.env.BOT_PORT),
        isProduction: process.env.NODE_ENV === PRODUCTION,
        isDevelopment: process.env.NODE_ENV === DEVELOPMENT,
        isTest: process.env.NODE_ENV === TEST,
    });
}
catch (e) {
    if (e instanceof zod_1.ZodError) {
        console.error("config error", e.message);
        process.exit(1);
    }
    throw e;
}
exports.default = config;
//# sourceMappingURL=config.js.map