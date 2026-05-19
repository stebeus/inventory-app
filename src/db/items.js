import { sql } from '#root/lib/postgres.js';

const createItem = async (categoryId, name, description, imgUrl) =>
	await sql`
    INSERT INTO items (category_id, name, description, img_url)
    VALUES (${categoryId}, ${name}, ${description}, ${imgUrl})
  `;

export { createItem };
