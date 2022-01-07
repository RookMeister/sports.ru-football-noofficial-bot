"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCommandHandler = void 0;
const keyboards_1 = require("@bot/helpers/keyboards");
const buttons_json_1 = require("@bot/helpers/buttons.json");
const startCommandHandler = async (ctx) => {
    const { username } = ctx.dbuser;
    const { size, column, values } = buttons_json_1.mainMenu;
    const keyboard = (0, keyboards_1.replyKeyboard)(values, size, column);
    await ctx.reply(`Привет @${username}.\nЭто неофициальный бот Sports.ru`, { ...keyboard });
};
exports.startCommandHandler = startCommandHandler;
//# sourceMappingURL=start-command.handler.js.map