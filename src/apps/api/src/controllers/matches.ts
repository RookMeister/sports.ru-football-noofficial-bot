import MatchesModel from '@api/models/Matches';
import ReviewsModel from '@api/models/Review';
import request from '@api/helpers/request';
import { RouteHandlerMethod } from 'fastify';
import { ISportsMatchResponse, IDataMatches } from '@api/interfaces/sports.ru.interface';
import { ISport24MatchesResponce } from '@api/interfaces/sport24.interface';

export const getTodayTopMatches: RouteHandlerMethod = async (req, reply): Promise<IDataMatches | null> => {
	try {
    const { date } = (req.params as  { date: string });
		const ids = await MatchesModel.getTopMatches(date || '');
		const matches = await getMatches(ids, date);
		return matches;
	} catch (err) {
		// throw boom.boomify(err as Error);
		throw err;
	}
};

export const getMatches = async (ids: string[] | null, date: string): Promise<IDataMatches | null> => {
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

export const getListMatches: RouteHandlerMethod = async (req, reply): Promise<ISport24MatchesResponce> => {
	try {
    // &competitionUrn=primera-division
    const { date } = (req.params as  { date: string });
    const matches = await request<ISport24MatchesResponce>(`${process.env.FETCH_GET_MATCHES_URL}?sportUrn=football&publishMatchbar=true&onDate=${date}`);
		return matches;
	} catch (err) {
		// throw boom.boomify(err as Error);
		throw err;
	}
};