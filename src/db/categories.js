import { sql } from '#root/lib/postgres.js';

const createCategory = async (name, imgUrl) =>
	await sql`INSERT INTO categories (name, img_url) VALUES (${name}, ${imgUrl})`;

const getAllCategories = async () => await sql`SELECT * FROM categories`;

const getCategory = async (id) => {
	const [category] = await sql`SELECT * FROM categories WHERE id = ${id}`;
	return category;
};

const updateCategory = async (name, imgUrl, id) =>
	await sql`
    UPDATE categories SET name = ${name}, img_url = ${imgUrl} WHERE id = ${id}
  `;

const deleteCategory = async (id) =>
	await sql`
    DELETE FROM items WHERE category_id = ${id};
    DELETE FROM categories WHERE id = ${id}
  `;

export {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategory,
	updateCategory,
};
