import { replyKeyboard } from '~/apps/bot/src/helpers/keyboards';
import { Context } from 'telegraf';
import { mainMenu } from '~/apps/bot/src/helpers/buttons';

export const startCommandHandler = async (ctx: Context) => {
  const { username } = ctx.dbuser;
  const { size, column, values } = mainMenu;
  const keyboard = replyKeyboard(values, size, column)
  await ctx.reply(`Привет @${username}.\nЭто неофициальный бот Sports.ru\nЗдесь можно узнать расписание матчей. Посмотреть обзоры после завершения матчей (когда они появятся на YouTube у правообладателей). Следить за статистикой чемпионатов. В скором времени можно будет читать новости с сайта Sports.Ru\nПо любым вопросам и предложениям обращаться к @Rookmeister\n\nКоманды:\n/time - установка часового пояса\n/changelog - список изменений`, { ...keyboard });
};
