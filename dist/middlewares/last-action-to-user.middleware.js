"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLastActionToUserMiddleware = void 0;
async function setLastActionToUserMiddleware(ctx, next) {
    ctx.dbuser.updatedAt = new Date();
    ctx.dbuser = await ctx.dbuser.save();
    return next();
}
exports.setLastActionToUserMiddleware = setLastActionToUserMiddleware;
//# sourceMappingURL=last-action-to-user.middleware.js.map