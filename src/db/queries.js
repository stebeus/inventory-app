import { queryDb, select } from '#root/utils/sql-queries.js';

const selectAllCategories = async () =>
	await queryDb(select, '*', 'categories');

export { selectAllCategories };
