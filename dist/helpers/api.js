"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTornamentPlayersStat = exports.getTornamentFutureMatches = exports.getTornamentLastMatches = exports.getTornamentTable = exports.getTornaments = exports.getGoalsMatch = exports.getTeaserMatches = exports.getMatches = void 0;
const _importDynamic = new Function('modulePath', 'return import(modulePath)');
async function fetch(...args) {
    const { default: fetch } = await _importDynamic('node-fetch');
    return fetch(...args);
}
async function request(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}
exports.default = request;
// URL Statistics
async function getMatches(ids) {
    if (!ids) {
        return null;
    }
    const requests = ids.map(id => request(`${process.env.API_SPORTSRU_ONLINE}?args={"id":${id}}`));
    const response = await Promise.all(requests);
    const data = [];
    const tournamentIndex = {};
    response.forEach((m) => {
        if (typeof tournamentIndex[m.tournament.id] === 'undefined') {
            tournamentIndex[m.tournament.id] = Object.keys(tournamentIndex).length;
            data.push({ name: `${m.tournament.name} ${m.tournament.stage_name}`, matches: [] });
        }
        // !tournamentIndex[m.tournament.id] && (tournamentIndex[m.tournament.id] = i) && (data.push({ name: m.tournament.id, matches: [] }));
        data[tournamentIndex[m.tournament.id]].matches.push(m);
        // matches[i].matches.push({
        //   status: { name: m.status_name, id: m.status_id },
        //   start_time: m.start_time,
        //   online_url: m.page_info.desktop_url,
        //   first_team: m.first_team,
        //   second_team: m.second_team
        // });
    });
    return data;
}
exports.getMatches = getMatches;
async function getTeaserMatches() {
    const url = process.env.API_SPORTSRU_TEASER;
    return await request(url);
}
exports.getTeaserMatches = getTeaserMatches;
async function getGoalsMatch(id) {
    const url = `${process.env.API_SPORTSRU_GOALS}?args={"id":${id}}`;
    return await request(url);
}
exports.getGoalsMatch = getGoalsMatch;
async function getTornaments() {
    const url = `${process.env.API_SPORTSRU_TOURNAMENTS}?args={"sport_id":208}`;
    return await request(url);
}
exports.getTornaments = getTornaments;
async function getTornamentTable(tournament_id) {
    const url = `${process.env.API_SPORTSRU_TOURNAMENT_TABLE}?args={"tournament_id":${tournament_id}}`;
    return await request(url);
}
exports.getTornamentTable = getTornamentTable;
async function getTornamentLastMatches(tournament_id) {
    const url = `${process.env.API_SPORTSRU_TOURNAMENT_LAST_MATCHES}?args={"tournament_id":${tournament_id}}`;
    return await request(url);
}
exports.getTornamentLastMatches = getTornamentLastMatches;
async function getTornamentFutureMatches(tournament_id) {
    const url = `${process.env.API_SPORTSRU_TOURNAMENT_FUTURE_MATCHES}?args={"tournament_id":${tournament_id}}`;
    return await request(url);
}
exports.getTornamentFutureMatches = getTornamentFutureMatches;
async function getTornamentPlayersStat(tournament_id) {
    const url = `${process.env.API_SPORTSRU_TOURNAMENT_PLAYER_STAT}?args={"tournament_id":${tournament_id}}`;
    return await request(url);
}
exports.getTornamentPlayersStat = getTornamentPlayersStat;
//# sourceMappingURL=api.js.map