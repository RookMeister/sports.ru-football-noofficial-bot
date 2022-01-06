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
  // const matches = await getTeaserMatches();
  // const info = convertTeaserData(matches);
  const ids = await MatchesModel.getTodayMatches();
  const matches = await getMatches(ids);
  const info = convertTeaserData(matches, ctx.dbuser.timeZone);
  if (update) {
    await ctx.editMessageText(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));
  } else {
    await ctx.replyWithHTML(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard });
  }
};

function convertTeaserData(matches: IDataMatches, timeZone: string) {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  // const matches = data.teaser.tournaments;
  const res = [];
  // matches.forEach(t => {
  for (const t of matches) {
    // if (t.sport.id === 208) {
      res.push(`\r\n<b><i>${t.name}</i></b>\r\n`);
      for (const m of t.matches) {
        const date = setTime(timeZone, m.start_time.full).split(', ');
        let string = `<b>${date[0]}</b> <a href="${m.page_info.desktop_url}">${m.first_team.name} - ${m.second_team.name}</a>`;
        string += ` ${m.status_id > 1 ? m.score + ' ' + m.status_name : `в ${date[1]}`}\r\n`;
        // if (m.first_team.score || m.second_team.score) {
        //   string += ` (<a href="https://www.sports.ru/stat/match/goals/${m.id}.html">Голы</a>)\r\n`;
        // } else {
        //   string += '\r\n';
        // }
        res.push(string);
        // res.push(`<b>${m.start_time.short_date}</b> <a href="https://www.sports.ru${m.online_url}">${m.first_team.name} - ${m.second_team.name}</a> ${m.status.id > 1 ? m.score + ' ' + m.status.name : m.status.name} (<a href="https://www.sports.ru/stat/match/goals/${m.id}.html">Голы</a>)\r\n`);
        // const { first_team, second_team } = await getGoalsMatch(m.id);
        // const goals = [...first_team.goals, ...second_team.goals].sort((a,b) => a.minute - b.minute);
        // goals.forEach(g =>  res.push(`${g.minute} ${g.name} ${g.action ? `(${g.action})` : g.assists[0] ? `(${g.assists[0]})` : ''}\r\n`));
      }
      // t.matches.forEach(m => {
      //   res.push(`<b>${m.start_time.short_date}</b> <a href="https://www.sports.ru${m.online_url}">${m.first_team.name} - ${m.second_team.name}</a> ${m.progress ? m.score + ' ' + m.status.name : m.status.name}\r\n`);
      // })
    // }
  };
  const string = res.reduce(reducer);
  return string;
}
