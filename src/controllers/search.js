import { kebabCase } from 'change-case';

import { selectAllCategories, selectAllItemsByName } from '#root/db/queries.js';

const getSearch = async (req, res) => {
	const {
		query: { q },
	} = req;

	const categories = await selectAllCategories();
	const items = await selectAllItemsByName(q);

	res.render('search', { title: 'Search', categories, items, kebabCase });
};

export { getSearch };
