"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTimeZoneHandler = exports.timeCommandHandler = void 0;
const telegraf_1 = require("telegraf");
const keyboards_1 = require("@bot/helpers/keyboards");
const buttons_json_1 = require("@bot/helpers/buttons.json");
const callback_data_1 = require("@bot/helpers/callback-data");
const timeHelper = (ctx) => {
    const timeZone = ctx.dbuser.timeZone;
    const nowUTC = new Date();
    nowUTC.setHours(nowUTC.getUTCHours() + Number(timeZone));
    const date = nowUTC.toLocaleString('ru', { hour: "numeric", minute: "numeric" });
    const { size, column, values } = buttons_json_1.setTime;
    const keyboard = (0, keyboards_1.inlineKeyboard)(values, size, column);
    return { date, timeZone, keyboard };
};
const timeCommandHandler = async (ctx) => {
    const { date, timeZone, keyboard } = timeHelper(ctx);
    await ctx.reply(`Твой часовой пояс ${timeZone}. Твоё время ${date}. Если это не так, измени часовой пояс.`, { ...keyboard });
};
exports.timeCommandHandler = timeCommandHandler;
const setTimeZoneHandler = async (ctx) => {
    const { code } = (0, callback_data_1.selectData)('select-time').parse((0, telegraf_1.deunionize)(ctx.callbackQuery).data);
    ctx.dbuser.timeZone = code;
    ctx.dbuser = await ctx.dbuser.save();
    const { date, timeZone } = timeHelper(ctx);
    ctx.editMessageText(`Теперь ваш часовой пояс ${timeZone}. Твоё время ${date}.`);
};
exports.setTimeZoneHandler = setTimeZoneHandler;
//# sourceMappingURL=timezone.handler.js.map