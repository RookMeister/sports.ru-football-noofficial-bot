"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachUserMiddleware = void 0;
const user_model_1 = require("@bot/models/user.model");
async function attachUserMiddleware(ctx, next) {
    const username = ctx.from.username || ctx.from.first_name || null;
    ctx.dbuser = await user_model_1.UserModel.findUserOrSave({ id: ctx.from.id, username });
    return next();
}
exports.attachUserMiddleware = attachUserMiddleware;
//# sourceMappingURL=attach-user.middleware.js.map