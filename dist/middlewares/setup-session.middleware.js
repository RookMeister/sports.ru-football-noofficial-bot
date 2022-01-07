"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSessionMiddleware = void 0;
const telegraf_session_local_1 = __importDefault(require("telegraf-session-local"));
const setupSessionMiddleware = () => new telegraf_session_local_1.default({ database: 'sessions.json' }).middleware();
exports.setupSessionMiddleware = setupSessionMiddleware;
//# sourceMappingURL=setup-session.middleware.js.map