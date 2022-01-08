import { replyKeyboard } from '@bot/helpers/keyboards';
import { Context } from 'telegraf';
import { mainMenu } from '@bot/helpers/buttons.json';

export const startCommandHandler = async (ctx: Context) => {
  const { username } = ctx.dbuser;
  const { size, column, values } = mainMenu;
  const keyboard = replyKeyboard(values, size, column)
  await ctx.reply(`Привет @${username}.\nЭто неофициальный бот Sports.ru\nЗдесь можно узнать расписание матчей (время будет в соответствии тем часовым поясом, который вы установите по команде /time). Посмотреть обзоры после завершения матчей (когда они появятся на YouTube у правообладателей). Следить за статистикой чемпионатов. В скором времени можно будет читать новости с сайта Sports.Ru\nПо любым вопросам и предложениям обращаться к @Rookmeister`, { ...keyboard });
};
