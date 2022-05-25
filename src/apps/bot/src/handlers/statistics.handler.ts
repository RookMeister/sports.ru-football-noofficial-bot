import { Context, deunionize } from 'telegraf';
import { table } from 'table';
import { selectData } from '~/apps/bot/src/helpers/callback-data';
import { ReviewsModel } from '~/apps/bot/src/models/reviews.model';
import { inlineKeyboard } from '~/apps/bot/src/helpers/keyboards';
import { statTournamentMenu } from '~/apps/bot/src/helpers/buttons';
import {
  getTornaments, getTornamentTable, getTornamentLastMatches, getTornamentFutureMatches, getTornamentPlayersStat
} from '~/apps/bot/src/helpers/api';
import {
  ISportsTournamentTableResponse, ISportsTournamentMatchesResponse
} from '@bot/interfaces/sports.ru.interface';

export const statCommandHandler = async (ctx: Context, edit = false) => {
  const tournaments = await getTornaments();
  tournaments.tournament_list.length = 10;
  const buttons = tournaments.tournament_list.map(v => ({
    active: 1, label: v.name, value: `select-tournament:${v.id}`
  }))
  const keyboard = inlineKeyboard(buttons, 1, false);
  if (edit) {
    await ctx.editMessageText('Пожалуйста, выберите турнир.', { ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));
  } else {
    await ctx.reply('Пожалуйста, выберите турнир.', { ...keyboard });
  }
};

export const statTournamentTabletHandler = async (ctx: Context) => {
  try {
    const { code } = selectData('select-tournament').parse(deunionize(ctx.callbackQuery).data);
    const [id, view] = code.split('.');
    if (view === 'back') {
      statCommandHandler(ctx, true);
    } else {
      const table = await getTornamentTable(id);
      let info = '';
      if (view === 'last') {
        const last = await getTornamentLastMatches(id);
        info = await statMatches(last);
      } else if (view === 'future') {
        const future = await getTornamentFutureMatches(id);
        info = await statMatches(future);
      } else if (view === 'player') {
        const player = await getTornamentPlayersStat(id);
        info = 'Игроки матчи';
      } else {
        info = statTable(table);
      }
      const { size, column, values } = statTournamentMenu;
      const buttons = values.map(v => { v.value = v.value.replace('$', id); return v; });
      const keyboard = inlineKeyboard(buttons, size, column);
      await ctx.editMessageText(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));
    }
  } catch (err) {
    console.error('statTournamentTabletHandler', err);
    return 'error';
  }
}

function statTable(data: ISportsTournamentTableResponse) {
  try {
    const { tournament_table } = data;
    let string = '';
    tournament_table.forEach( ({ list, group }) => {
      const tables = [];
      const head = ['Место', 'Команда', 'Очки'];
      tables.push(head);
      list.forEach(element => {
        const { score, place, team_info } = element;
        tables.push([place, team_info.name, score])
      });
      if (group.name) { string += `\r\n<b><i>${group.name}</i></b>\r\n`; }
      string += `<pre>${table(tables)}</pre>`;
    })
    return string;
  } catch (err) {
    console.error('statTable', err);
  }
}

async function statMatches(data: ISportsTournamentMatchesResponse) {
  try {
    const { match_list } = data;
    let string = '';
    // match_list.forEach(el => {
    for (const el of match_list) {
      string += `\r\n<b><i>${el.title}</i></b>\r\n`;
      // el.matches.forEach(match => {
      for (const match of el.matches) {
        const { first_team, second_team, start_time, online_url, status_id } = match;
        string += `<a href='https://www.sports.ru${online_url}'>${first_team.name} \u2014 ${second_team.name}</a> `;
        if (status_id === 10) {
          string += 'перенесён\r\n';
        } else if (status_id > 1) {
          string += `${first_team.goals}:${second_team.goals}`;
          const [date] = new Date(start_time.full).toISOString().split('T');
          const title = new RegExp(`${first_team.name}|${second_team.name}`);
          const review = await ReviewsModel.findReview({ date, title });
          if (review) {
            string += ` <a href="${review.url}">Обзор матча</a>\r\n`
          } else {
            string += '\r\n';
          }
        } else {
          string += `(${start_time.time} - мск. время)\r\n`;
        }
        // string += ` ${status_id > 1 ? `${first_team.goals}:${second_team.goals}\r\n`: `(${start_time.time} - мск. время)\r\n`}`;
      };
    };
    return string || 'Нет информации';
  } catch (err) {
    console.error('statMatches', err);
    return 'Нет информации';
  }
}