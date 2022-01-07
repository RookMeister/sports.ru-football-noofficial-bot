"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesHandler = void 0;
const keyboards_1 = require("@bot/helpers/keyboards");
const transform_date_1 = require("@bot/helpers/transform-date");
const buttons_json_1 = require("@bot/helpers/buttons.json");
const matches_model_1 = require("@bot/models/matches.model");
const api_1 = require("@bot/helpers/api");
const matchesHandler = async (ctx, update = false) => {
    const { size, column, values } = buttons_json_1.matchesUpdate;
    const keyboard = (0, keyboards_1.inlineKeyboard)(values, size, column);
    // const matches = await getTeaserMatches();
    // const info = convertTeaserData(matches);
    const ids = await matches_model_1.MatchesModel.getTodayMatches();
    const matches = await (0, api_1.getMatches)(ids);
    const info = convertTeaserData(matches, ctx.dbuser.timeZone);
    if (update) {
        await ctx.editMessageText(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));
    }
    else {
        await ctx.replyWithHTML(info, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard });
    }
};
exports.matchesHandler = matchesHandler;
function convertTeaserData(matches, timeZone) {
    if (!matches) {
        return 'Нет подходящих матчей';
    }
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    // const matches = data.teaser.tournaments;
    const res = [];
    // matches.forEach(t => {
    for (const t of matches) {
        // if (t.sport.id === 208) {
        res.push(`\r\n<b><i>${t.name}</i></b>\r\n`);
        for (const m of t.matches) {
            const date = (0, transform_date_1.setTime)(timeZone, m.start_time.full).split(', ');
            let string = `<b>${date[0]}</b> <a href="${m.page_info.desktop_url}">${m.first_team.name} \u2014 ${m.second_team.name}</a>`;
            string += ` ${m.status_id > 1 ? m.score + ' ' + m.status_name : `в ${date[1]}`}\r\n`;
            res.push(string);
        }
    }
    ;
    const string = res.reduce(reducer);
    return string;
}
//# sourceMappingURL=matches.handler.js.map