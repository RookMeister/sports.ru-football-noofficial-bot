import * as standingsController from '@api/controllers/standings';
import { RouteOptions } from 'fastify';
// import { GetTopMatchesSchema } from '@api/routes/documentation/matchesApi';

const getStandingRoute: RouteOptions = {
	method: 'GET',
	url: '/api/standing/:id/',
	handler: standingsController.getStanding,
	// schema: GetTopMatchesSchema,
};
const getAllCompetitionsgRoute: RouteOptions = {
	method: 'GET',
	url: '/api/competition/',
	handler: standingsController.getAllCompetitions,
	// schema: GetTopMatchesSchema,
};
const getCompetitionRoute: RouteOptions = {
	method: 'GET',
	url: '/api/competition/:urn/:seasonUrn',
	handler: standingsController.getCompetition,
	// schema: GetTopMatchesSchema,
};

const routes = [getStandingRoute, getAllCompetitionsgRoute, getCompetitionRoute];

export default routes;
