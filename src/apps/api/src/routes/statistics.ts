import * as tournamentController from '@api/controllers/tournaments';
import { RouteOptions } from 'fastify';
// import { GetTopMatchesSchema } from '@api/routes/documentation/matchesApi';

const getTornamentTable: RouteOptions = {
	method: 'GET',
	url: '/api/tournament/:id/table/',
	handler: tournamentController.getTornamentTable,
	// schema: GetTopMatchesSchema,
};

const getTornamentLastMatches: RouteOptions = {
	method: 'GET',
	url: '/api/tournament/:id/last-matches/',
	handler: tournamentController.getTornamentLastMatches,
	// schema: GetTopMatchesSchema,
};

const getTornamentFutureMatches: RouteOptions = {
	method: 'GET',
	url: '/api/tournament/:id/future-matches/',
	handler: tournamentController.getTornamentFutureMatches,
	// schema: GetTopMatchesSchema,
};

const getTornamentPlayersStat: RouteOptions = {
	method: 'GET',
	url: '/api/tournament/:id/player-stat/',
	handler: tournamentController.getTornamentPlayersStat,
	// schema: GetTopMatchesSchema,
};

const routes = [getTornamentTable, getTornamentLastMatches, getTornamentFutureMatches, getTornamentPlayersStat];

export default routes;
