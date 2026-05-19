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

const getItemsByName = async (name) =>
	await sql`SELECT * FROM items WHERE name ILIKE ${`%${name}%`}`;

const getItemCount = async (categoryId) => {
	const [{ itemCount }] = await sql`
    SELECT COUNT(*) AS item_count FROM items WHERE category_id = ${categoryId}
  `;

	return itemCount;
};

const updateItem = async (name, description, imgUrl, id) =>
	await sql`
    UPDATE items
    SET
      name = ${name},
      description = ${description},
      img_url = ${imgUrl},
      updated_at = NOW()
    WHERE id = ${id}
  `;

export {
	createItem,
	getAllItems,
	getItem,
	getItemCount,
	getItemsByName,
	updateItem,
};
