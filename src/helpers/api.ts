import {
  ISportsTeaserResponse,
  ISportsTournamentsListResponse,
  ISportsTournamentTableResponse,
  ISportsTournamentMatchesResponse,
  ISportsGoalsResponse,
  ISportsMatchResponse,
  ISportsTournamentPlayersStatResponse,
  IDataMatches
} from '@bot/interfaces/sports.ru.interface';

const _importDynamic = new Function('modulePath', 'return import(modulePath)')

async function fetch(...args) {
  const {default: fetch} = await _importDynamic('node-fetch');
  return fetch(...args);
}

export default async function request<T>(url: string) : Promise<T> {
  try {
    const response = await fetch(url);
    const data =  await response.json() as Promise<T>;
    return data;
  } catch (err) {
    console.error(err);
  }
}

// URL Statistics
export async function getMatches(ids: string[] | null): Promise<IDataMatches | null>  {
  if (!ids) {
    return null;
  }
  const requests =
    ids.map(id => request(`${process.env.API_SPORTSRU_ONLINE}?args={"id":${id}}`));
  const response = await Promise.all(requests);
  const data = [];
  const tournamentIndex = {};
  response.forEach((m: ISportsMatchResponse) => {
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
  })

  return data;
}
export async function getTeaserMatches(): Promise<ISportsTeaserResponse>  {
  const url = process.env.API_SPORTSRU_TEASER;
  return await request(url);
}
export async function getGoalsMatch(id: number): Promise<ISportsGoalsResponse>  {
  const url = `${process.env.API_SPORTSRU_GOALS}?args={"id":${id}}`;
  return await request(url);
}
export async function getTornaments(): Promise<ISportsTournamentsListResponse>  {
  const url = `${process.env.API_SPORTSRU_TOURNAMENTS}?args={"sport_id":208}`;
  return await request(url);
}
export async function getTornamentTable(tournament_id: string): Promise<ISportsTournamentTableResponse>  {
  const url = `${process.env.API_SPORTSRU_TOURNAMENT_TABLE}?args={"tournament_id":${tournament_id}}`;
  return await request(url);
}
export async function getTornamentLastMatches(tournament_id: string): Promise<ISportsTournamentMatchesResponse>  {
  const url = `${process.env.API_SPORTSRU_TOURNAMENT_LAST_MATCHES}?args={"tournament_id":${tournament_id}}`;
  return await request(url);
}
export async function getTornamentFutureMatches(tournament_id: string): Promise<ISportsTournamentMatchesResponse>  {
  const url = `${process.env.API_SPORTSRU_TOURNAMENT_FUTURE_MATCHES}?args={"tournament_id":${tournament_id}}`;
  return await request(url);
}
export async function getTornamentPlayersStat(tournament_id: string): Promise<ISportsTournamentPlayersStatResponse>  {
  const url = `${process.env.API_SPORTSRU_TOURNAMENT_PLAYER_STAT}?args={"tournament_id":${tournament_id}}`;
  return await request(url);
}