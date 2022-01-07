// import { Context, deunionize } from 'telegraf';
// import { table } from 'table';
// import { selectData } from '@bot/helpers/callback-data';
// import { inlineKeyboard } from '@bot/helpers/keyboards';
// import { matchesUpdate } from '@bot/helpers/buttons.json';
// import {
//   getTornaments, getTornamentTable, getTornamentLastMatches, getTornamentFutureMatches, getTornamentPlayersStat
// } from '@bot/helpers/api';
// import {
//   ISportsTournamentTableResponse, ISportsTournamentMatchesResponse
// } from '@bot/interfaces/sports.ru.interface';
// export const statCommandHandler = async (ctx: Context, edit = false) => {
//   const tournaments = await getTornaments();
//   const obj = { size: 1, column: false, values: [] };
//   obj.values = tournaments.tournament_list.map(v => ({
//     active: 1, label: v.name, value: `select-tournament-sports:${v.id}`
//   }))
// //   const keyboard = statMenuKeyboard(ctx.i18n.locale());
//   // const { size, column, values } = matchesUpdate
//   const keyboard = inlineKeyboard(values, size, column);
// //   if (edit) {
// //     await ctx.editMessageText('Пожалуйста, выберите вид спорта.', { ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));
// //   } else {
// //     await ctx.reply('Пожалуйста, выберите вид спорта.', { ...keyboard });
// //   }
// };
// export const statTournamentMenuSelectHandler = async (ctx: Context) => {
//   // const { code } = selectData('select-sport-sports').parse(deunionize(ctx.callbackQuery).data);
//   // if (code === 'back') {
//   //   statCommandHandler(ctx, true);
//   // } else {
//   //   const tournaments = await getTornaments(code);
//   //   const keyboard = statTournamentMenuKeyboard(ctx.i18n.locale(), tournaments);
//   //   const { size, column, values } = matchesUpdate
//   //   const keyboard = inlineKeyboard(values, size, column);
//   //   await ctx.editMessageText('Пожалуйста, выберите турнир.', { ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));
//   // }
// }
// export const statTournamentTabletHandler = async (ctx: Context) => {
//   try {
//     const { code } = selectData('select-tournament-sports').parse(deunionize(ctx.callbackQuery).data);
//     const [id, view] = code.split('.');
//     const { timeZone } = ctx.dbuser;
//     if (code === 'back') {
//       statTournamentMenuSelectHandler(ctx);
//     } else {
//       const table = await getTornamentTable(id);
//       let info = '';
//       const { sport_id } = table;
//       if (view === 'last') {
//         const last = await getTornamentLastMatches(id);
//         info = statMatches(last, timeZone);
//       } else if (view === 'future') {
//         const future = await getTornamentFutureMatches(id);
//         info = statMatches(future, timeZone);
//       } else if (view === 'player') {
//         const player = await getTornamentPlayersStat(id);
//         info = 'Игроки матчи';
//       } else {
//         info = statTable(table, ctx.i18n.locale());
//       }
//       const { size, column, values } = matchesUpdate
//       const keyboard = inlineKeyboard(values, size, column);
//       const keyboard = statTournamenBackKeyboard(ctx.i18n.locale(), id, sport_id);
//       await ctx.editMessageText(info, { parse_mode: 'HTML', ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));;
//     }
//   } catch (err) {
//     console.error('statTournamentTabletHandler', err);
//     return 'error';
//   }
// }
// function statTable(data: ISportsTournamentTableResponse, loc: string) {
//   try {
//     const { tournament_table } = data;
//     let string = '';
//     tournament_table.forEach( ({ list, group }) => {
//       const tables = [];
//       const head = ['Место', 'Команда', 'Очки'];
//       tables.push(head);
//       list.forEach(element => {
//         const { score, place, team_info } = element;
//         tables.push([place, team_info.name, score])
//       });
//       if (group.name) { string += `\r\n<b><i>${group.name}</i></b>\r\n`; }
//       string += `<pre>${table(tables)}</pre>`;
//     })
//     return string;
//   } catch (err) {
//     console.error('statTable', err);
//   }
// }
// function statMatches(data: ISportsTournamentMatchesResponse) {
//   try {
//     const { match_list } = data;
//     let string = '';
//     match_list.forEach(el => {
//       string += `\r\n<b><i>${el.title}</i></b>\r\n`;
//       el.matches.forEach(match => {
//         const { first_team, second_team, start_time, online_url, status_id } = match;
//         string += `<a href='https://www.sports.ru${online_url}'>${first_team.name} \u2014 ${second_team.name}</a>`;
//         string += ` ${status_id > 1 ? `${first_team.goals}:${second_team.goals}\r\n`: `(${start_time.time} - мск. время)\r\n`}`;
//       });
//     });
//     return string || 'Нет информации';
//   } catch (err) {
//     console.error('statMatches', err);
//     return 'Нет информации';
//   }
// }
//# sourceMappingURL=statistics.handler.js.map