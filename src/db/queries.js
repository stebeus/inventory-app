import { queryDb, select } from '#root/utils/sql-queries.js';

const selectAllCategories = async () =>
	await queryDb(select, '*', 'categories');

const selectAllItems = async (categoryId) =>
	await queryDb(select, '*', `"${categoryId}"`);

const selectCategoryName = async (categoryId) => {
	const [{ name }] = await queryDb(
		select,
		'name',
		'categories',
		`id = ${categoryId}`,
	);

	return name;
};

export { selectAllCategories, selectAllItems, selectCategoryName };
