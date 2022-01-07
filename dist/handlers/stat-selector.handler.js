"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statTournamentTabletHandler = exports.statTournamentMenuSelectHandler = exports.statCommandHandler = void 0;
const telegraf_1 = require("telegraf");
const table_1 = require("table");
const date_1 = require("@bot/helpers/date");
const callback_data_1 = require("@bot/helpers/callback-data");
const data_json_1 = require("@bot/data.json");
const keyboards_1 = require("@bot/helpers/keyboards");
const api_1 = require("@bot/helpers/api");
const statCommandHandler = async (ctx, edit = false) => {
    const keyboard = (0, keyboards_1.statMenuKeyboard)(ctx.i18n.locale());
    if (edit) {
        await ctx.editMessageText(ctx.i18n.t('stat_select_sport'), { ...keyboard }).catch((err) => ctx.answerCbQuery(ctx.i18n.t('lastInfo')));
        ;
    }
    else {
        await ctx.reply(ctx.i18n.t('stat_select_sport'), { ...keyboard });
    }
};
exports.statCommandHandler = statCommandHandler;
const statTournamentMenuSelectHandler = async (ctx) => {
    const { code } = (0, callback_data_1.selectData)('select-sport-sports').parse((0, telegraf_1.deunionize)(ctx.callbackQuery).data);
    if (code === 'back') {
        (0, exports.statCommandHandler)(ctx, true);
    }
    else {
        const tournaments = await (0, api_1.getTornaments)(code);
        const keyboard = (0, keyboards_1.statTournamentMenuKeyboard)(ctx.i18n.locale(), tournaments);
        await ctx.editMessageText(ctx.i18n.t('stat_select_tournament'), { ...keyboard }).catch((err) => ctx.answerCbQuery(ctx.i18n.t('lastInfo')));
        ;
    }
};
exports.statTournamentMenuSelectHandler = statTournamentMenuSelectHandler;
const statTournamentTabletHandler = async (ctx) => {
    try {
        const { code } = (0, callback_data_1.selectData)('select-tournament-sports').parse((0, telegraf_1.deunionize)(ctx.callbackQuery).data);
        const [id, view] = code.split('.');
        const { timeZone } = ctx.dbuser;
        if (code === 'back') {
            (0, exports.statTournamentMenuSelectHandler)(ctx);
        }
        else {
            const table = await (0, api_1.getTornamentTable)(id);
            let info = '';
            const { sport_id } = table;
            if (view === 'last') {
                const last = await (0, api_1.getTornamentLastMatches)(id);
                info = statMatches(last, Number(timeZone));
            }
            else if (view === 'future') {
                const future = await (0, api_1.getTornamentFutureMatches)(id);
                info = statMatches(future, Number(timeZone));
            }
            else if (view === 'player') {
                const player = await (0, api_1.getTornamentPlayersStat)(id);
                info = 'Игроки матчи';
            }
            else {
                info = statTable(table, ctx.i18n.locale());
            }
            const keyboard = (0, keyboards_1.statTournamenBackKeyboard)(ctx.i18n.locale(), id, sport_id);
            await ctx.editMessageText(info, { parse_mode: 'HTML', ...keyboard }).catch((err) => ctx.answerCbQuery(ctx.i18n.t('lastInfo')));
            ;
        }
    }
    catch (err) {
        console.error('statTournamentTabletHandler', err);
        return 'error';
    }
};
exports.statTournamentTabletHandler = statTournamentTabletHandler;
function statTable(data, loc) {
    try {
        const { tournament_table } = data;
        let string = '';
        tournament_table.forEach(({ list, group }) => {
            const tables = [];
            const head = data_json_1.tableHead.map(e => e[loc]);
            tables.push(head);
            list.forEach(element => {
                const player = element.player_info?.tag_name || '';
                const team = element.team_info?.name || '';
                const { score, win_percent, place } = element;
                tables.push([place, player || team, score || win_percent]);
            });
            if (group.name) {
                string += `\r\n<b><i>${group.name}</i></b>\r\n`;
            }
            string += `<pre>${(0, table_1.table)(tables)}</pre>`;
        });
        return string;
    }
    catch (err) {
        console.error('statTable', err);
    }
}
function statMatches(data, timeZone) {
    try {
        const { match_list } = data;
        let string = '';
        match_list.forEach(el => {
            string += `\r\n<b><i>${el.title}</i></b>\r\n`;
            el.matches.forEach(match => {
                const { first_team = null, second_team = null, winner = null, race_type_name = null, start_time } = match;
                if (race_type_name) {
                    string += `${start_time.short_date} \u2014 ${winner ? winner.name + ' \u2014 ' : ''}${race_type_name}\r\n`;
                }
                else {
                    string += `${first_team.name} \u2014 ${second_team.name} `;
                    // string += (isPastDate(match.start_time.full)) ? `${match.first_team.goals}:${match.second_team.goals}\r\n` : `(${getHoursTimeZone(match.start_time.full, timeZone)})\r\n`;
                    string += ((0, date_1.isPastDate)(start_time.full)) ? `${first_team.goals}:${second_team.goals}\r\n` : `(${start_time.time} - мск. время)\r\n`;
                }
            });
        });
        return string || 'Нет информации';
    }
    catch (err) {
        console.error('statMatches', err);
        return 'Нет информации';
    }
}
//# sourceMappingURL=stat-selector.handler.js.map