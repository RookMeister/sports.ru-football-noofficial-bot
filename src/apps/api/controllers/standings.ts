import request from '@helpers/request';
import { RouteHandlerMethod } from 'fastify';
import {
  ISport24CompetitionStandingLeagueResponce,
  ISport24CompetitionStandingCupResponce,
  ISport24CompetitionsResponce,
	ISport24CompetitionReviewResponce
} from '@interfaces/sport24.interface';

type TLEAGUEORCUP = ISport24CompetitionStandingLeagueResponce | ISport24CompetitionStandingCupResponce;

export const getStanding: RouteHandlerMethod = async (req, reply): Promise<TLEAGUEORCUP> => {
	try {
    const { id } = (req.params as  { id: string });
    const standing = await request<TLEAGUEORCUP>(`${process.env.FETCH_GET_STANDING_URL}${id}`);
		return standing;
	} catch (err) {
		// throw boom.boomify(err as Error);
		throw err;
	}
};

export const getAllCompetitions: RouteHandlerMethod = async (req, reply): Promise<ISport24CompetitionsResponce> => {
	try {
    const standings = await request<ISport24CompetitionsResponce>(`${process.env.FETCH_GET_ALL_COMPETITIONS_URL}`);
		return standings;
	} catch (err) {
		// throw boom.boomify(err as Error);
		throw err;
	}
};
export const getCompetition: RouteHandlerMethod = async (req, reply): Promise<ISport24CompetitionReviewResponce> => {
	try {
    const { urn, seasonUrn = '' } = (req.params as  { urn: string, seasonUrn?: string });
    const season = seasonUrn ? `seasonUrn=${seasonUrn}` : '';
    const standings = await request<ISport24CompetitionReviewResponce>(`${process.env.FETCH_GET_COMPETITION_URL}${urn}/review?materialsLimit=0&newsLimit=0&${season}`);
		return standings;
	} catch (err) {
		// throw boom.boomify(err as Error);
		throw err;
	}
};
