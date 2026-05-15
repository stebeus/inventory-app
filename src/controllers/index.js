import {
	selectAllCategories,
	selectAllItems,
	selectCategory,
} from '#root/db/queries.js';

const getIndex = async (req, res) => {
	const {
		params: { categoryId },
	} = req;

	const { name } = await selectCategory(categoryId);
	const categories = await selectAllCategories();
	const items = await selectAllItems(categoryId);

	res.render('index', { title: name, categories, items });
};

export { getIndex };
