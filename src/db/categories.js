import { sql } from '#root/lib/postgres.js';

const createCategory = async (name, imgUrl) =>
	await sql`INSERT INTO categories (name, img_url) VALUES (${name}, ${imgUrl})`;

export { createCategory };
