import * as matchesController from '@api/controllers/matches';
import { RouteOptions } from 'fastify';
// import { GetTopMatchesSchema } from '@api/routes/documentation/matchesApi';

const getTopMatchesRoute: RouteOptions = {
	method: 'GET',
	url: '/api/top-matches/:date/',
	handler: matchesController.getTodayTopMatches,
	// schema: GetTopMatchesSchema,
};

const getListMatchesRoute: RouteOptions = {
	method: 'GET',
	url: '/api/matches/:date/',
	handler: matchesController.getListMatches,
	// schema: GetTopMatchesSchema,
};

const routes = [getTopMatchesRoute, getListMatchesRoute];

export default routes;
