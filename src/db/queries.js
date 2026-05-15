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

const selectItem = async (categoryId, itemId) => {
	const [item] = await queryDb(
		select,
		'*',
		`"${categoryId}"`,
		`id = ${itemId}`,
	);

	return item;
};

export { selectAllCategories, selectAllItems, selectCategoryName, selectItem };
