import { replyKeyboard } from '@bot/helpers/keyboards';
import { Context } from 'telegraf';
import { mainMenu } from '@bot/helpers/buttons.json';

export const startCommandHandler = async (ctx: Context) => {
  const { username } = ctx.dbuser;
  const { size, column, values } = mainMenu;
  const keyboard = replyKeyboard(values, size, column)
  await ctx.reply(`Привет @${username}.\nЭто неофициальный бот Sports.ru`, { ...keyboard });
};
