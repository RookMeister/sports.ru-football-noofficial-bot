import MatchesModel from '@api/models/Matches';
import ReviewsModel from '@api/models/Review';
import request from '@helpers/request';
import { RouteHandlerMethod } from 'fastify';
import { ISportsMatchResponse, IDataMatches } from '@interfaces/sports.ru.interface';
import { ISport24MatchesResponce } from '@interfaces/sport24.interface';

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

export const getListMatches: RouteHandlerMethod = async (req, reply): Promise<any> => {
	try {
    // &competitionUrn=primera-division
    const { date } = (req.params as  { date: string });
    const matches = await request<ISport24MatchesResponce>(`${process.env.FETCH_GET_MATCHES_URL}?sportUrn=football&publishMatchbar=true&onDate=${date}`);
    const data = await updateMatches(matches, date);
		return data;
	} catch (err) {
		// throw boom.boomify(err as Error);
		throw err;
	}
};

const updateMatches = async (matches: ISport24MatchesResponce, date: string): Promise<any> => {
  const reviews = await ReviewsModel.findReviewsToday(date);
  matches.seasons = Object.values(matches.seasons).sort((a, b) => a.competition.priority - b.competition.priority);
  matches.items.forEach((match) => {
    const team1 = matches.participants[match.competitors[0].participantId].titleRu;
    const team2 = matches.participants[match.competitors[1].participantId].titleRu;
    const title = new RegExp(`${team1}|${team2}`);
    const review = reviews.find(r => r.title.match(title));
    match.reviewUrl = review ? review.url : '';
    match.competitors = match.competitors.sort((a, b) => a.priority - b.priority);
  });
  return matches;
}