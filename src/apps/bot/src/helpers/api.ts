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
import { UTCDate } from '~/apps/bot/src/helpers/transform-date';

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

export async function getReviewMatches(): Promise<any[]> {
  const ids = process.env.ID_CHANELS.split(',');
  const requests =
    ids.map(id => request(`https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY_YOTUBE}&channelId=${id}&part=snippet,id&order=date&maxResults=10&regionCode=RU`));
  const response = await Promise.all(requests);
  const data = [];
  response.forEach((y: any) => {
    if (y.items) {
      y.items.forEach((v: any) => {
        const condition1 = v.snippet.title.includes('Обзор матча');
        const condition2 = v.snippet.title.includes('Обзор первого матча');
        const condition3 = v.snippet.title.includes('Обзор второго матча');
        const condition4 = v.snippet.title.includes('Лучшие моменты матча');
        const condition5 = v.snippet.title.includes('Огляд матчу');
        const condition6 = v.snippet.title.includes('Обзор');
        if (condition1 || condition2 || condition3 || condition4 || condition5 || condition6) {
          data.push({
            videoId: v.id.videoId,
            url: `https://www.youtube.com/watch?v=${v.id.videoId}`,
            date: v.snippet.publishedAt,
            dateDay: UTCDate(),
            title: v.snippet.title.replace('-', '—'),
            channelTitle: v.snippet.channelTitle
          })
        }
      });
    }
  })
  return data
}
export async function getMatches(date: string): Promise<IDataMatches | null>  {
  const data = await request<IDataMatches>(`http://127.0.0.1:3000/api/top-matches/${date}/`);
  return data;
}
// export async function getMatches(ids: string[] | null): Promise<IDataMatches | null>  {
//   if (!ids) {
//     return null;
//   }
//   const requests =
//     ids.map(id => request(`${process.env.API_SPORTSRU_ONLINE}?args={"id":${id}}`));
//   const response = await Promise.all(requests);
//   const data = [];
//   const tournamentIndex = {};
//   response.forEach((m: ISportsMatchResponse) => {
//     if (typeof tournamentIndex[m.tournament.id] === 'undefined') {
//       tournamentIndex[m.tournament.id] = Object.keys(tournamentIndex).length;
//       const id = m.tournament.id;
//       const name = m.tournament.name;
//       const title = m.tournament.stage_name
//         ? `${m.tournament.name} ${m.tournament.stage_name}`
//         : m.tournament.name;
//       data.push({ name, title, id, matches: [], matchesIds: [] });
//     }
//     data[tournamentIndex[m.tournament.id]].matches.push(m);
//     data[tournamentIndex[m.tournament.id]].matchesIds.push(m.id);
//   })

//   return data;
// }
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