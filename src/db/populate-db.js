#!/usr/bin/node

import { Client } from 'pg';

import { DB_URL } from '#root/config.js';
import { createTable } from '#root/utils/sql-queries.js';

const populateDb = async () => {
	console.log('Seeding...');

	const client = new Client({ connectionString: DB_URL });

	const sql = createTable(
		'categories',
		'name VARCHAR (25) NOT NULL',
		'img_url TEXT NOT NULL',
		'timestamp TIMESTAMPTZ DEFAULT NOW()',
	);

	await client.connect();
	await client.query(sql);
	await client.end();

	console.log('Done');
};

populateDb();
