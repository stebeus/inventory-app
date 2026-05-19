import { pinoHttp } from 'pino-http';

const pino = Object.freeze(
	pinoHttp({
		transport: {
			target: 'pino-pretty',
		},
	}),
);

const { logger } = pino;

export { logger, pino };
