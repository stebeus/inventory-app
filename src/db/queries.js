import { pool } from './pool.js';

const insertCategory = async (name, imgUrl) =>
	await pool.query(
		'INSERT INTO categories (name, img_url) VALUES ($1, $2) RETURNING *',
		[name, imgUrl],
	);

const insertItem = async (categoryId, name, imgUrl, description) =>
	await pool.query(
		`
		INSERT INTO items (category_id, name, img_url, description)
		VALUES ($1, $2, $3, $4)
		RETURNING *
		`,
		[categoryId, name, imgUrl, description],
	);

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

const updateCategory = async (name, imgUrl, id) =>
	await pool.query(
		`UPDATE categories SET name = $1 img_url = $2 WHERE id = $3`,
		[name, imgUrl, id],
	);

export {
	insertCategory,
	insertItem,
	selectAllCategories,
	selectAllItems,
	selectAllItemsByName,
	selectCategory,
	selectItem,
	selectItemCount,
	updateCategory,
};
