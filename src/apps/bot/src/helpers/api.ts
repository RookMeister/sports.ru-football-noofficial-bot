import {
  ISportsTournamentsListResponse,
  ISportsTournamentTableResponse,
  ISportsTournamentMatchesResponse,
  ISportsTournamentPlayersStatResponse,
  IDataMatches
} from '@interfaces/sports.ru.interface';
import config from '@bot/config';

import request from '@api/services/request';

export async function getMatches(date: string): Promise<IDataMatches | null>  {
  console.log(`${config.API_URL}/api/top-matches/${date}/`);
  const data = await request<IDataMatches>(`${config.API_URL}/api/top-matches/${date}/`);
  return data;
}
// export async function getTeaserMatches(): Promise<ISportsTeaserResponse>  {
//   const url = process.env.API_SPORTSRU_TEASER;
//   return await request(url);
// }
// export async function getGoalsMatch(id: number): Promise<ISportsGoalsResponse>  {
//   const url = `${process.env.API_SPORTSRU_GOALS}?args={"id":${id}}`;
//   return await request(url);
// }
export async function getTornaments(): Promise<ISportsTournamentsListResponse>  {
  console.log(`${config.API_URL}/api/tournament/208/`);
  const url = `${config.API_URL}/api/tournament/208/`;
  return await request(url);
}
export async function getTornamentTable(tournament_id: string): Promise<ISportsTournamentTableResponse>  {
  const url = `${config.API_URL}/api/tournament/${tournament_id}/table/`;
  return await request(url);
}
export async function getTornamentLastMatches(tournament_id: string): Promise<ISportsTournamentMatchesResponse>  {
  const url = `${config.API_URL}/api/tournament/:${tournament_id}/last-matches/`;
  return await request(url);
}
export async function getTornamentFutureMatches(tournament_id: string): Promise<ISportsTournamentMatchesResponse>  {
  const url = `${config.API_URL}/api/tournament/${tournament_id}/future-matches/`;
  return await request(url);
}
export async function getTornamentPlayersStat(tournament_id: string): Promise<ISportsTournamentPlayersStatResponse>  {
  const url = `${config.API_URL}/api/tournament/${tournament_id}/player-stat/`;
  return await request(url);
}