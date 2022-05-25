import { Context, deunionize } from 'telegraf';
import { ITimeZone } from '~/apps/bot/src/models/user.model';
import { inlineKeyboard } from '~/apps/bot/src/helpers/keyboards';
import { setTime } from '~/apps/bot/src/helpers/buttons';
import { selectData } from '~/apps/bot/src/helpers/callback-data';

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
  const { code } = selectData('select-time').parse(deunionize(ctx.callbackQuery).data) ;
  ctx.dbuser.timeZone = code as ITimeZone;
  ctx.dbuser = await ctx.dbuser.save();
  const { date, timeZone } = timeHelper(ctx);
  ctx.editMessageText(`Теперь ваш часовой пояс ${timeZone}. Твоё время ${date}.`);
}