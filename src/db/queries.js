import { pool } from './pool.js';

const selectAllCategories = async () => {
	const { rows } = await pool.query('SELECT * FROM CATEGORIES');
	return rows;
};

const selectAllItems = async (categoryId) => {
	const { rows } = await pool.query(
		'SELECT * FROM items WHERE category_id = $1',
		[categoryId],
	);

	return rows;
};

const selectAllItemsByName = async (name) => {
	const { rows } = await pool.query('SELECT * FROM items WHERE name ILIKE $1', [
		`%${name}%`,
	]);

	return rows;
};

const selectCategory = async (categoryId) => {
	const {
		rows: [category],
	} = await pool.query('SELECT * FROM categories WHERE id = $1', [categoryId]);

	return category;
};

const selectItem = async (itemId) => {
	const {
		rows: [item],
	} = await pool.query('SELECT * FROM items WHERE id = $1', [itemId]);

	return item;
};

const selectItemCount = async (categoryId) => {
	const {
		rows: [{ item_count }],
	} = await pool.query(
		'SELECT COUNT(*) AS item_count FROM items WHERE category_id = $1',
		[categoryId],
	);

	return item_count;
};

export {
	selectAllCategories,
	selectAllItems,
	selectAllItemsByName,
	selectCategory,
	selectItem,
	selectItemCount,
};
