import * as matchesController from '../controllers/matches';
import { RouteOptions } from 'fastify';
import { GetTopMatchesSchema } from './documentation/matchesApi';
// import { ApiController } from '@api/services/fastify-types';

// const getTopMatchesRoute: ApiController<any,  { id: string }> = {
const getTopMatchesRoute: RouteOptions = {
	method: 'GET',
	url: '/api/top-matches/:date/',
	handler: matchesController.getTodayTopMatches,
	schema: GetTopMatchesSchema,
};

const routes = [getTopMatchesRoute];

export default routes;
