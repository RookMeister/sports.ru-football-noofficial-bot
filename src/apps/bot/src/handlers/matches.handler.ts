import { inlineKeyboard } from '~/apps/bot/src/helpers/keyboards';
import { setTime } from '~/apps/bot/src/helpers/transform-date';
import { UTCDate } from '~/apps/bot/src/helpers/transform-date';
import { matchesUpdate } from '~/apps/bot/src/helpers/buttons';
import { Context, deunionize } from 'telegraf';
import { MatchesModel } from '~/apps/bot/src/models/matches.model';
import { ReviewsModel } from '~/apps/bot/src/models/reviews.model';
import { getMatches } from '~/apps/bot/src/helpers/api';
import { selectData } from '~/apps/bot/src/helpers/callback-data';
import { IDataMatches } from '~/interfaces/sports.ru.interface';

export const matchesHandler = async (ctx: Context, update = false) => {
  const { size, column, values } = matchesUpdate;
  let date = UTCDate()
  if (update) {
    const { code } = selectData('update-matches').parse(deunionize(ctx.callbackQuery).data);
    date = UTCDate(code);
  }
  const keyboard = inlineKeyboard(values, size, column);
  // const ids = await MatchesModel.getTodayTopMatches(date);
  const matches = await getMatches(date);
  const info = await convertTeaserData(matches, ctx.dbuser.timeZone);
  if (update) {
    return await ctx.editMessageText(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));
  } else {
    return await ctx.replyWithHTML(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard });
  }
};

async function convertTeaserData(matches: IDataMatches | null, timeZone: string) {
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
        const [date] = new Date(m.start_time.full).toISOString().split('T');
        const title = new RegExp(`${m.first_team.name}|${m.second_team.name}`);
        const review = await ReviewsModel.findReview({ date, title });
        if (review) {
          string += ` <a href="${review.url}">Обзор матча</a>\r\n`
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
