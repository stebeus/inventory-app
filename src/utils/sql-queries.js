import { pool } from '#root/db/pool.js';

const createTable = (name, ...columns) => {
	const stringifiedColumns = columns.toString();

	return `
    CREATE TABLE IF NOT EXISTS ${name} (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      ${stringifiedColumns}
    )
  `;
};

const createTables = (...tables) =>
	tables.map((name, ...columns) => createTable(name, ...columns)).join(';');

const dropTable = (name) => `DROP TABLE IF EXISTS ${name}`;

const referenceForeignKey = (childTable, parentTable) =>
	`${childTable}_id INT REFERENCES ${parentTable} (id)`;

const insert = (table, columns, ...values) => {
	const parseArray = (array) => `(${array})`;

	const stringifiedColumns = columns.toString();
	const stringifiedValues = values.map(parseArray).toString();

	return `
    INSERT INTO ${table} (${stringifiedColumns})
    VALUES ${stringifiedValues}
  `;
};

const select = (columns, table, clause) => {
	const stringifiedColumns = columns.toString();
	return `SELECT ${stringifiedColumns} FROM ${table} ${clause}`;
};

const update = (table, condition, ...columns) => {
	const parseArray = ([column, value]) => `${column} = ${value}`;
	const stringifiedColumns = columns.map(parseArray).toString();
	return `UPDATE ${table} SET ${stringifiedColumns} WHERE ${condition}`;
};

const del = (table, condition) => `DELETE FROM ${table} WHERE ${condition}`;

const queryDb = async (command, ...params) => {
	const sql = command(...params);
	const query = await pool.query(sql);

	const isSelect = command.name === 'select';

	return isSelect ? query.rows : query;
};

export {
	createTable,
	createTables,
	del,
	dropTable,
	insert,
	queryDb,
	referenceForeignKey,
	select,
	update,
};
