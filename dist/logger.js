"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerOptions = void 0;
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("@bot/config"));
exports.loggerOptions = {
    level: config_1.default.LOG_LEVEL,
};
if (config_1.default.isDevelopment) {
    exports.loggerOptions.base = {};
    exports.loggerOptions.prettyPrint = {
        colorize: true,
        translateTime: true,
    };
}
const logger = (0, pino_1.default)(exports.loggerOptions);
exports.default = logger;
//# sourceMappingURL=logger.js.map