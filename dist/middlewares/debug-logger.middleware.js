"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugLoggerMiddleware = void 0;
const telegraf_update_logger_1 = __importDefault(require("telegraf-update-logger"));
const config_1 = __importDefault(require("@bot/config"));
const debugLoggerMiddleware = (options) => (ctx, next) => {
    ctx.logger.trace({
        msg: 'update received',
        update: ctx.update,
    });
    return (0, telegraf_update_logger_1.default)({
        log: (msg) => ctx.logger.debug({
            msg,
        }),
        colors: config_1.default.isDevelopment,
        ...options,
    })(ctx, next);
};
exports.debugLoggerMiddleware = debugLoggerMiddleware;
//# sourceMappingURL=debug-logger.middleware.js.map