import { pinoHttp } from 'pino-http';

import { NODE_ENV } from '#root/config.js';

const developmentEnv = NODE_ENV !== 'production' && {
	level: 'debug',
	serializers: {
		req: ({ method, url }) => ({ method, url }),
		res: ({ statusCode }) => ({ statusCode }),
	},
};

const pino = Object.freeze(
	pinoHttp({
		transport: {
			target: 'pino-pretty',
		},
		...developmentEnv,
	}),
);

const { logger } = pino;

export { logger, pino };
