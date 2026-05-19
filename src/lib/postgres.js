import postgres from 'postgres';

import { DB_URL } from '#root/config.js';

const sql = Object.freeze(
	postgres(DB_URL, {
		debug: true,
	}),
);

export { sql };
