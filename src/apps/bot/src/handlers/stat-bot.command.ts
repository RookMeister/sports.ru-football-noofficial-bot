import { Context, deunionize } from 'telegraf';
import { UserModel } from '@bot/models/user.model';
import { StatModel } from '@bot/models/analytics.model';
import { selectData } from '@bot/helpers/callback-data';
import { UTCDate, UTCPrev1Day } from '@helpers/transform-date';
import { formatISO } from 'date-fns';
import { inlineKeyboard } from '@bot/helpers/keyboards';
import { statBotMenu } from '@bot/helpers/buttons';

export const statBotCommandHandler = async (ctx: Context, date: string, edit: boolean) => {
  if (ctx.from?.id === 302423620) {
    const stringDate = (date === 'prev') ? UTCPrev1Day() : UTCDate();

    const usersData = await UserModel.findAllUsers();
    const statsData = await StatModel.getStatOfDate(stringDate);

    const [users, stats] = await Promise.all([usersData, statsData]);

    const alluserscount = users.length || 0;
    const newuserscount = users.filter(user => formatISO(user.createdAt || 0, { representation: 'date' }) === stringDate).length || 0;
    const allcount = stats.find(stat => stat.view === 'all')?.count || 0;
    const { size, column, values } = statBotMenu;
    const keyboard = inlineKeyboard(values, size, column);
    const info = `Статистика за ${stringDate}:\r\nВсего пользователей: ${alluserscount}\r\nСегодня зарегистрировалось: ${newuserscount}\r\nВсего действий: ${allcount}`;
    if (edit) {
      await ctx.editMessageText(info, { ...keyboard });
    } else {
      await ctx.replyWithHTML(info, { ...keyboard });
    }
  } else {
    await ctx.reply('Извини, я не могу тебя понять. Используй кнопки. Если не видишь кнопки, отправь мне /start');
  }
};

export const statBotMenuSelectHandler = async (ctx: Context) => {
  if (ctx.callbackQuery) {
    const { code } = selectData('select-stat-bot').parse(deunionize(ctx.callbackQuery).data);
    statBotCommandHandler(ctx, code, true);
  }
}