import { getAllCategories, getCategory } from '#root/db/models/categories.js';
import { getAllItems } from '#root/db/models/items.js';

const getIndex = async (req, res) => {
	const {
		params: { categoryId },
	} = req;

	if (categoryId == null) res.redirect('/categories/1/');

	const { name } = await getCategory(categoryId);
	const categories = await getAllCategories();
	const items = await getAllItems(categoryId);

	res.render('index', { title: name, categories, items });
};

export { getIndex };
