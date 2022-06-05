import { inlineKeyboard } from '@bot/services/keyboards';
import { Context } from 'telegraf';
import { mainMenu } from '@bot/services/buttons';

export const startCommandHandler = async (ctx: Context) => {
  const { username } = ctx.dbuser;
  const { size, column, values } = mainMenu;
  const keyboard = inlineKeyboard(values, size, column)
  await ctx.reply(`Привет @${username}.\nЭто неофициальный бот Sports.ru\nЗдесь можно узнать расписание матчей. Посмотреть обзоры.\nПо любым вопросам и предложениям обращаться к @Rookmeister\n\nДля просмотра списка команд начните вводить "/" либо нажмите на синее меню слева от ввода\n👇`, { ...keyboard });
};
