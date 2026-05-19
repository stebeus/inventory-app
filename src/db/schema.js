const timestamps = [
	'created_at TIMESTAMPTZ DEFAULT NOW()',
	'updated_at TIMESTAMPTZ',
];

const tables = Object.freeze([
	{
		name: '',
		columns: [...timestamps],
	},
]);

export { tables };
