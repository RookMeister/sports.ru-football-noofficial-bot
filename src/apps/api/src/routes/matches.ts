import * as matchesController from '@api/controllers/matches';
import { RouteOptions } from 'fastify';
// import { GetTopMatchesSchema } from '@api/routes/documentation/matchesApi';

const getTopMatchesRoute: RouteOptions = {
	method: 'GET',
	url: '/api/top-matches/:date/',
	handler: matchesController.getTodayTopMatches,
	// schema: GetTopMatchesSchema,
};

const routes = [getTopMatchesRoute];

export default routes;
