import { logger } from '#root/lib/pino-http.js';
import { sql } from '#root/lib/postgres.js';

import { createTables } from './queries.js';
import { tables } from './schema.js';

const initDb = async () => {
	logger.info('Initializing database...');

	await createTables(...tables);
	await sql.end();

	logger.info('Done');
};

initDb();
