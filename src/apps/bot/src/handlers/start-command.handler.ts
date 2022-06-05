import { Context } from 'telegraf';

export const startCommandHandler = async (ctx: Context) => {
  const { username } = ctx.dbuser;
  await ctx.reply(`Привет @${username}. Это неофициальный бот Sports.ru\nЗдесь можно узнать расписание матчей и посмотреть обзоры.\nПо любым вопросам и предложениям обращаться к @Rookmeister\nДля просмотра списка команд начните вводить "/" либо нажмите на синее меню слева от ввода\n👇`);
};
