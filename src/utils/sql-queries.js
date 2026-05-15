import { pool } from '#root/db/pool.js';

const createTable = (name, ...columns) => {
	const stringifiedColumns = columns.toString();

	return `
    CREATE TABLE IF NOT EXISTS ${name} (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      ${stringifiedColumns}
    );
  `;
};

const dropTable = (name) => `DROP TABLE IF EXISTS ${name}`;

const insert = (table, columns, values) => {
	const parseArray = (array) => `(${array})`;

	const stringifiedColumns = columns.toString();
	const stringifiedValues = values.map(parseArray).toString();

	return `
    INSERT INTO ${table} (${stringifiedColumns})
    VALUES ${stringifiedValues}
  `;
};

const select = (columns, table, condition) => {
	const stringifiedColumns = columns.toString();
	const hasCondition = condition == null ? '' : ` WHERE ${condition}`;
	return `SELECT ${stringifiedColumns} FROM ${table}${hasCondition}`;
};

const update = (table, condition, ...columns) => {
	const stringifiedColumns = columns.toString();
	return `UPDATE ${table} SET ${stringifiedColumns} WHERE ${condition}`;
};

const del = (table, condition) => `DELETE FROM ${table} WHERE ${condition}`;

const queryDb = async (command, ...params) => {
	const sql = command(...params);
	const query = await pool.query(sql);

	const isSelect = command.name === 'select';

	return isSelect ? query.rows : query;
};

export { createTable, del, dropTable, insert, queryDb, select, update };
