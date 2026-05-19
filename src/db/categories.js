import { sql } from '#root/lib/postgres.js';

const createCategory = async (name, imgUrl) =>
	await sql`INSERT INTO categories (name, img_url) VALUES (${name}, ${imgUrl})`;

const getAllCategories = async () => await sql`SELECT * FROM categories`;

const getCategory = async (id) =>
	await sql`SELECT * FROM categories WHERE id = ${id}`;

const updateCategory = async (name, imgUrl, id) =>
	await sql`
    UPDATE categories SET name = ${name}, img_url = ${imgUrl} WHERE id = ${id}
  `;

export { createCategory, getAllCategories, getCategory, updateCategory };
