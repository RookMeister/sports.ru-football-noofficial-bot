import { inlineKeyboard } from '@bot/services/keyboards';
import { setTime, UTCDate } from '@bot/helpers/transform-date';
import { matchesUpdate } from '@bot/services/buttons';
import { Context, deunionize } from 'telegraf';
import { getMatches } from '@bot/services/api';
import { selectData } from '@bot/services/callback-data';
import { IDataMatches } from '@interfaces/sports.ru.interface';

export const matchesHandler = async (ctx: Context, update = false) => {
  const { size, column, values } = matchesUpdate;
  let date = UTCDate()
  if (update && ctx.callbackQuery) {
    const { code } = selectData('update-matches').parse(deunionize(ctx.callbackQuery).data);
    date = UTCDate(code);
  }
  const keyboard = inlineKeyboard(values, size, column);
  const matches = await getMatches(date);
  const info = convertTeaserData(matches, ctx.dbuser.timeZone);
  if (update) {
    await ctx.editMessageText(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));
  } else {
    await ctx.replyWithHTML(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard });
  }
};

function convertTeaserData(matches: IDataMatches | null, timeZone: string) {
  if (!matches || !matches.length) {
    return 'Нет подходящих матчей'
  }

  const reducer = (previousValue: string, currentValue: string) => previousValue + currentValue;
  const res = [];
  for (const t of matches) {
    res.push(`\r\n<b><i>${t.title}</i></b>\r\n`);
    for (const m of t.matches) {
      let string = ''
      const date = setTime(timeZone, m.start_time.full).split(', ');
      if (m.status_id === 1) {
        string += `<b>${date[0]}</b> `;
      }
      string += `<a href="${m.page_info.desktop_url}">${m.first_team.name} \u2014 ${m.second_team.name}</a> `;
      if (m.status_id > 1) {
        string += `${m.first_team.score}:${m.second_team.score} ${m.state_name}`;
        if (m.review) {
          string += ` <a href="${m.review.url}">Обзор матча</a>\r\n`
        } else {
          string += '\r\n';
        }
      } else {
        string += `в ${date[1]}\r\n`;
      }
      res.push(string);
    }
  };
  const string = res.reduce(reducer);
  return string;
}
