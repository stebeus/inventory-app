import { getAllCategories } from '#root/db/models/categories.js';
import { getAllItemsByName } from '#root/db/models/items.js';

const getSearch = async (req, res) => {
	const {
		query: { q },
	} = req;

	const categories = await getAllCategories();
	const items = await getAllItemsByName(q);

	res.render('search', { title: 'Search', categories, items });
};

export { getSearch };
