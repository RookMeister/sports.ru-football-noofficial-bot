import { Context, deunionize } from 'telegraf';
import { ITimeZone } from '@bot/models/user.model';
import { inlineKeyboard } from '@bot/services/keyboards';
import { setTime } from '@bot/services/buttons';
import { selectData } from '@bot/services/callback-data';

const timeHelper = (ctx: Context) => {
  const timeZone = ctx.dbuser.timeZone;
  const nowUTC = new Date();
  nowUTC.setHours(nowUTC.getUTCHours() + Number(timeZone));
  const date = nowUTC.toLocaleString('ru', { hour: "numeric", minute: "numeric" });
  const { size, column, values } = setTime
  const keyboard = inlineKeyboard(values, size, column);
  return { date, timeZone, keyboard };
}

export const timeCommandHandler = async (ctx: Context) => {
  const { date, timeZone, keyboard } = timeHelper(ctx);
  await ctx.reply(`Твой часовой пояс ${timeZone}. Твоё время ${date}. Если это не так, измени часовой пояс.`, { ...keyboard });
};

export const setTimeZoneHandler = async (ctx: Context) => {
  if (ctx.callbackQuery) {
    const { code } = selectData('select-time').parse(deunionize(ctx.callbackQuery).data) ;
    ctx.dbuser.timeZone = code as ITimeZone;
    ctx.dbuser = await ctx.dbuser.save();
    const { date, timeZone } = timeHelper(ctx);
    ctx.editMessageText(`Теперь ваш часовой пояс ${timeZone}. Твоё время ${date}.`);
  }
}