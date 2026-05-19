const timestamps = [
	'created_at TIMESTAMPTZ DEFAULT NOW()',
	'updated_at TIMESTAMPTZ',
];

const tables = Object.freeze([
	{
		name: 'categories',
		columns: [
			'name VARCHAR (25) NOT NULL',
			'img_url TEXT NOT NULL',
			...timestamps,
		],
	},
]);

export { tables };
