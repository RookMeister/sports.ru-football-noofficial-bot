import boom from '@hapi/boom';
import MatchesModel from '@api/models/Matches';
import ReviewsModel from '@api/models/Review';
import request from '@api/services/request';
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
} from '@interfaces/sports.ru.interface';

export const getTodayTopMatches: RouteHandlerMethod = async (req, reply): Promise<IDataMatches | null> => {
	try {
    const { date } = (req.params as  { date: string });
		const ids = await MatchesModel.getTopMatches(date || '');
		const matches = await getMatches(ids, date);
		return matches;
	} catch (err) {
		throw boom.boomify(err as Error);
	}
};

async function getMatches(ids: string[] | null, date: string): Promise<IDataMatches | null>  {
  if (!ids) {
    return null;
  }
  const requests =
    ids.map(id => request<ISportsMatchResponse>(`${process.env.API_SPORTSRU_ONLINE}?args={"id":${id}}`));
  const response = await Promise.all(requests);
  const data: IDataMatches = [];
  const tournamentIndex: any = {};
  const reviews = await ReviewsModel.findReviewsToday(date);
  response.forEach((m: ISportsMatchResponse) => {
    const title = new RegExp(`${m.first_team.name}|${m.second_team.name}`);
    const review = reviews.find((r: any) => r.title.match(title));
    const match = { ...m, review };
    if (typeof tournamentIndex[m.tournament.id] === 'undefined') {
      tournamentIndex[m.tournament.id] = Object.keys(tournamentIndex).length;
      const id = m.tournament.id;
      const name = m.tournament.name;
      const title = m.tournament.stage_name
        ? `${m.tournament.name} ${m.tournament.stage_name}`
        : m.tournament.name;
      data.push({ name, title, id, matches: [], matchesIds: [] });
    }
    data[tournamentIndex[m.tournament.id]].matches.push(match);
    data[tournamentIndex[m.tournament.id]].matchesIds.push(match.id.toString());
  });

  return data;
}