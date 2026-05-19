import { sql } from '#root/lib/postgres.js';

const constrainToFk = (column, table = `${column}s`) =>
	`${column}_id BIGINT REFERENCES ${table} (id)`;

const createTable = ({ name, columns }) =>
	sql.unsafe(`
		CREATE TABLE IF NOT EXISTS ${name} (
			id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			${columns.join(', ')}
		)
	`);

const createTables = (...tables) => Promise.all(tables.map(createTable));

export { constrainToFk, createTables };
