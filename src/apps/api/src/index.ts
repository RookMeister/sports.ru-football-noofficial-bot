import * as fastify from 'fastify';
import mongoose from 'mongoose';
import routes from '@api/routes';
import { Options } from './config/swagger';
import { config } from './config';
import swagger from '@fastify/swagger';
const env = process.env.NODE_ENV;

// Configure App
const app = fastify.default({ logger: true });
app.register(swagger, Options);

routes.forEach(route => {
	app.route(route);
});

const start = async (): Promise<void> => {
	try {
		await app.listen(config.SERVER_PORT);
		app.swagger();
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();

export default app;

// Configure DB
if (env !== 'test' && config.MONGO) {
	mongoose
		.connect(config.MONGO)
		.then(() => app.log.info('MongoDB connected...'))
		.catch(err => app.log.error(err));
}
