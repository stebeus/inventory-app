import { queryDb, select } from '#root/utils/sql-queries.js';

const selectAllCategories = async () =>
	await queryDb(select, '*', 'categories');

const selectAllItems = async (categoryId) =>
	await queryDb(select, '*', `"${categoryId}"`);

export { selectAllCategories, selectAllItems };
