#!/usr/bin/node

import { Client } from 'pg';

import { DB_URL } from '#root/config.js';
import { createTables, referenceForeignKey } from '#root/utils/sql-queries.js';

const populateDb = async () => {
	console.log('Seeding...');

	const client = new Client({ connectionString: DB_URL });

	const sql = createTables(
		[
			'categories',
			'name VARCHAR (25) NOT NULL',
			'img_url TEXT NOT NULL',
			'timestamp TIMESTAMPTZ DEFAULT NOW()',
		],
		[
			'items',
			referenceForeignKey('category', 'categories'),
			'name VARCHAR (25) NOT NULL',
			'description VARCHAR (250) NOT NULL',
			'img_url TEXT NOT NULL',
			'timestamp TIMESTAMPTZ DEFAULT NOW()',
		],
	);

	await client.connect();
	await client.query(sql);
	await client.end();

	console.log('Done');
};

populateDb();
