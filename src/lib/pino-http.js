import { pinoHttp } from 'pino-http';

const pino = Object.freeze(
	pinoHttp({
		level: 'debug',
		serializers: {
			req: ({ method, url }) => ({ method, url }),
			res: ({ statusCode }) => ({ statusCode }),
		},
		transport: {
			target: 'pino-pretty',
		},
	}),
);

const { logger } = pino;

export { logger, pino };
