import { Context } from 'telegraf';
import changelog from '@bot/changelog.json';

export const changelogCommandHandler = async (ctx: Context) => {
  let info = '<b>Список изменений:</b>\r\n\r\n';
  changelog.forEach(c => {
    info += `<i><b>${c.date}</b></i>\r\n`;
    info += c.text + '\r\n\r\n';
  })
  await ctx.reply(info, { parse_mode: 'HTML' });
};