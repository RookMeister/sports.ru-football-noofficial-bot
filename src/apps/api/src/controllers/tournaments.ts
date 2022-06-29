import request from '@api/helpers/request';
import { RouteHandlerMethod } from 'fastify';

import { ISportsTournamentTableResponse, ISportsTournamentMatchesResponse, ISportsTournamentPlayersStatResponse, ISportsTournamentsListResponse } from '@interfaces/sports.ru.interface';

export const getTornaments: RouteHandlerMethod = async (req, reply): Promise<ISportsTournamentsListResponse> => {
	try {
    const { id } = (req.params as  { id: string });
    const tornaments = await request<ISportsTournamentsListResponse>(`${process.env.API_SPORTSRU_TOURNAMENTS}?args={"sport_id":${id}}`);
    return tornaments
	} catch (err) {
		throw err;
		// throw boom.boomify(err as Error);
	}
};

export const getTornamentTable: RouteHandlerMethod = async (req, reply): Promise<ISportsTournamentTableResponse> => {
	try {
    const { id } = (req.params as  { id: string });
    const table = await request<ISportsTournamentTableResponse>(`${process.env.API_SPORTSRU_TOURNAMENT_TABLE}?args={"tournament_id":${id}}`);
    return table
	} catch (err) {
		throw err;
		// throw boom.boomify(err as Error);
	}
};

export const getTornamentLastMatches: RouteHandlerMethod = async (req, reply): Promise<ISportsTournamentMatchesResponse> => {
	try {
    const { id } = (req.params as  { id: string });
    const lastMatches = await request<ISportsTournamentMatchesResponse>(`${process.env.API_SPORTSRU_TOURNAMENT_LAST_MATCHES}?args={"tournament_id":${id}}`);
    return lastMatches
	} catch (err) {
		throw err;
		// throw boom.boomify(err as Error);
	}
};

export const getTornamentFutureMatches: RouteHandlerMethod = async (req, reply): Promise<ISportsTournamentMatchesResponse> => {
	try {
    const { id } = (req.params as  { id: string });
    const futureMatches = await request<ISportsTournamentMatchesResponse>(`${process.env.API_SPORTSRU_TOURNAMENT_FUTURE_MATCHES}?args={"tournament_id":${id}}`);
    return futureMatches
	} catch (err) {
		throw err;
		// throw boom.boomify(err as Error);
	}
};

export const getTornamentPlayersStat: RouteHandlerMethod = async (req, reply): Promise<ISportsTournamentPlayersStatResponse> => {
	try {
    const { id } = (req.params as  { id: string });
    const playerStat = await request<ISportsTournamentPlayersStatResponse>(`${process.env.API_SPORTSRU_TOURNAMENT_PLAYER_STAT}?args={"tournament_id":${id}}`);
    return playerStat;
	} catch (err) {
		throw err;
		// throw boom.boomify(err as Error);
	}
};