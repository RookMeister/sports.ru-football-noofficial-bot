import boom from '@hapi/boom';
import Matches from '../models/Matches';
import request from '../services/request';
import { RouteHandlerMethod } from 'fastify';

import {
  ISportsTeaserResponse,
  ISportsTournamentsListResponse,
  ISportsTournamentTableResponse,
  ISportsTournamentMatchesResponse,
  ISportsGoalsResponse,
  ISportsMatchResponse,
  ISportsTournamentPlayersStatResponse,
  IDataMatches
} from '~/interfaces/sports.ru.interface';

// export const getTodayTopMatches = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<string[]> => {
export const getTodayTopMatches: RouteHandlerMethod = async (req, reply): Promise<IDataMatches | null> => {
	try {
    const { date } = (req.params as  { date: string });
		const ids = await Matches.getTopMatches(date || '');
		const matches = await getMatches(ids);
		return matches;
	} catch (err) {
		throw boom.boomify(err as Error);
	}
};

async function getMatches(ids: string[] | null): Promise<IDataMatches | null>  {
  if (!ids) {
    return null;
  }
  const requests =
    ids.map(id => request<ISportsMatchResponse>(`${process.env.API_SPORTSRU_ONLINE}?args={"id":${id}}`));
  const response = await Promise.all(requests);
  const data: IDataMatches = [];
  const tournamentIndex: any = {};
  response.forEach((m: ISportsMatchResponse) => {
    if (typeof tournamentIndex[m.tournament.id] === 'undefined') {
      tournamentIndex[m.tournament.id] = Object.keys(tournamentIndex).length;
      const id = m.tournament.id;
      const name = m.tournament.name;
      const title = m.tournament.stage_name
        ? `${m.tournament.name} ${m.tournament.stage_name}`
        : m.tournament.name;
      data.push({ name, title, id, matches: [], matchesIds: [] });
    }
    data[tournamentIndex[m.tournament.id]].matches.push(m);
    data[tournamentIndex[m.tournament.id]].matchesIds.push(m.id.toString());
  })

  return data;
}