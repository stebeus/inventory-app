import { selectAllCategories, selectAllItemsByName } from '#root/db/queries.js';
import { toKebabCase } from '#root/utils/formatters.js';

const getSearch = async (req, res) => {
	const {
		query: { q },
	} = req;

	const categories = await selectAllCategories();
	const items = await selectAllItemsByName(q);

	res.render('search', { title: 'Search', categories, items, toKebabCase });
};

export { getSearch };
