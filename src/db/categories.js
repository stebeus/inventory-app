import { sql } from '#root/lib/postgres.js';

const createCategory = async (name, imgUrl) =>
	await sql`INSERT INTO categories (name, img_url) VALUES (${name}, ${imgUrl})`;

const getAllCategories = async () => await sql`SELECT * FROM categories`;

const getCategory = async (id) =>
	await sql`SELECT * FROM categories WHERE id = ${id}`;

export { createCategory, getAllCategories, getCategory };
