#!/usr/bin/node

import { Client } from 'pg';

import { DB_URL } from '#root/config.js';

const populateDb = async () => {
	console.log('Seeding...');

	const client = new Client({ connectionString: DB_URL });

	const sql = `
		CREATE TABLE IF NOT EXISTS categories (
			id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			name VARCHAR (25) NOT NULL,
			img_url TEXT NOT NULL,
			timestamp TIMESTAMPTZ DEFAULT NOW()
		);

		CREATE TABLE IF NOT EXISTS items (
			id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			category_id BIGINT REFERENCES categories (id),
			name VARCHAR (25) NOT NULL,
			description VARCHAR (250) NOT NULL,
			img_url TEXT NOT NULL,
			timestamp TIMESTAMPTZ DEFAULT NOW()
		);
	`;

	await client.connect();
	await client.query(sql);
	await client.end();

	console.log('Done');
};

populateDb();
