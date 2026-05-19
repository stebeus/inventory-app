import { app } from './app.js';
import { HOSTNAME, PORT } from './config.js';
import { logger } from './lib/pino-http.js';

app.listen(PORT, HOSTNAME, () =>
	logger.info(`Server running at http://${HOSTNAME}:${PORT}/`),
);
