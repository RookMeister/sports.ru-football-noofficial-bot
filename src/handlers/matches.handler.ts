import { inlineKeyboard } from '@bot/helpers/keyboards';
import { setTime } from '@bot/helpers/transform-date';
import { matchesUpdate } from '@bot/helpers/buttons.json';
import { Context } from 'telegraf';
import { MatchesModel } from '@bot/models/matches.model';
import { getTeaserMatches, getGoalsMatch, getMatches } from '@bot/helpers/api';
import { ISportsMatchResponse, IDataMatches } from '@bot/interfaces/sports.ru.interface';


export const matchesHandler = async (ctx: Context, update = false) => {
  const { size, column, values } = matchesUpdate
  const keyboard = inlineKeyboard(values, size, column);
  const ids = await MatchesModel.getTodayMatches();
  const matches = await getMatches(ids);
  const info = convertTeaserData(matches, ctx.dbuser.timeZone);
  if (update) {
    await ctx.editMessageText(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));
  } else {
    await ctx.replyWithHTML(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard });
  }
};

function convertTeaserData(matches: IDataMatches | null, timeZone: string) {
  if (!matches) {
    return 'Нет подходящих матчей'
  }

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  // const matches = data.teaser.tournaments;
  const res = [];
  // matches.forEach(t => {
  for (const t of matches) {
    // if (t.sport.id === 208) {
      res.push(`\r\n<b><i>${t.name}</i></b>\r\n`);
      for (const m of t.matches) {
        let string = ''
        const date = setTime(timeZone, m.start_time.full).split(', ');
        if (m.status_id === 1) {
          string += `<b>${date[0]}</b> `;
        }
        string += `<a href="${m.page_info.desktop_url}">${m.first_team.name} \u2014 ${m.second_team.name}</a> `;
        if (m.status_id > 1) {
          string += `${m.score + ' ' + m.status_name}\r\n`;
        } else {
          string += `в ${date[1]}\r\n`;
        }
        res.push(string);
      }
  };
  const string = res.reduce(reducer);
  return string;
}
