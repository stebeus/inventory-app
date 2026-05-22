import { getAllCategories, getCategory } from '#root/db/models/categories.js';
import { getAllItems, getAllItemsByName } from '#root/db/models/items.js';

const getIndex = async (req, res) => {
	const {
		params: { categoryId = 1 },
	} = req;

	if (categoryId == null) res.redirect('/categories/1/');

	const { name } = await getCategory(categoryId);
	const categories = await getAllCategories();
	const items = await getAllItems(categoryId);

	res.render('index', { title: name, categories, items });
};

const getSearch = async (req, res) => {
	const {
		query: { q },
	} = req;

	const categories = await getAllCategories();
	const items = await getAllItemsByName(q);

	res.render('index', { title: 'Search', categories, items });
};

export { getIndex, getSearch };
