"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLoggerMiddleware = void 0;
const logger_1 = __importDefault(require("@bot/logger"));
const crypto_1 = require("crypto");
const setupLoggerMiddleware = () => (ctx, next) => {
    ctx.logger = logger_1.default.child({
        requestId: (0, crypto_1.randomUUID)(),
    });
    next();
};
exports.setupLoggerMiddleware = setupLoggerMiddleware;
//# sourceMappingURL=setup-logger.middleware.js.map