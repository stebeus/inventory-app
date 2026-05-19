import { sql } from '#root/lib/postgres.js';

const createItem = async (categoryId, name, description, imgUrl) =>
	await sql`
    INSERT INTO items (category_id, name, description, img_url)
    VALUES (${categoryId}, ${name}, ${description}, ${imgUrl})
  `;

const getAllItems = async (categoryId) =>
	await sql`SELECT * FROM items WHERE category_id = ${categoryId}`;

const getItem = async (id) => {
	const [item] = await sql`SELECT * FROM items WHERE id = ${id}`;
	return item;
};

export { createItem, getAllItems, getItem };
