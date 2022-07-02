import * as reviewsController from '@api/controllers/reviews';
import { RouteOptions } from 'fastify';

const getReviewssRoute: RouteOptions = {
	method: 'GET',
	url: '/api/reviews/:date/',
	handler: reviewsController.getReviews,
};

const routes = [getReviewssRoute];

export default routes;
