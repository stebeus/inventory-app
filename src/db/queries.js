import { queryDb, select } from '#root/utils/sql-queries.js';

const selectAllCategories = async () =>
	await queryDb(select, '*', 'categories');

const selectAllItems = async (categoryId) =>
	await queryDb(select, '*', 'items', `WHERE category_id = ${categoryId}`);

const selectCategory = async (categoryId) => {
	const [category] = await queryDb(
		select,
		'*',
		'categories',
		`WHERE id = ${categoryId}`,
	);

	return category;
};

const selectItem = async (itemId) => {
	const [item] = await queryDb(select, '*', 'items', `WHERE id = ${itemId}`);
	return item;
};

const selectItemCount = async (categoryId) => {
	const [{ item_count }] = await queryDb(
		select,
		'COUNT(*) AS item_count',
		'items',
		`
			INNER JOIN categories
			ON categories.id = ${categoryId}
			GROUP BY category_id
		`,
	);

	return item_count;
};

export {
	selectAllCategories,
	selectAllItems,
	selectCategory,
	selectItem,
	selectItemCount,
};
