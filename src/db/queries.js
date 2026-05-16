import { queryDb, select } from '#root/utils/sql-queries.js';

const CATEGORIES = 'categories';
const ITEMS = 'items';

const selectAllCategories = async () => await queryDb(select, '*', CATEGORIES);

const selectAllItems = async (categoryId) =>
	await queryDb(select, '*', ITEMS, `WHERE category_id = ${categoryId}`);

const selectCategory = async (categoryId) => {
	const [category] = await queryDb(
		select,
		'*',
		CATEGORIES,
		`WHERE id = ${categoryId}`,
	);

	return category;
};

const selectItem = async (itemId) => {
	const [item] = await queryDb(select, '*', ITEMS, `WHERE id = ${itemId}`);
	return item;
};

const selectItemCount = async (categoryId) => {
	const [{ item_count }] = await queryDb(
		select,
		'COUNT(*) AS item_count',
		ITEMS,
		`
			INNER JOIN categories
			ON categories.id = ${categoryId}
			GROUP BY category_id
		`,
	);

	return item_count;
};

const selectItemsByName = async (name) =>
	await queryDb(select, 'name', ITEMS, `WHERE name ILIKE '%${name}%'`);

export {
	selectAllCategories,
	selectAllItems,
	selectCategory,
	selectItem,
	selectItemCount,
	selectItemsByName,
};
