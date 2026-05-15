import {
	selectAllCategories,
	selectAllItems,
	selectCategoryName,
} from '#root/db/queries.js';

const getIndex = async (req, res) => {
	const {
		params: { categoryId },
	} = req;

	const title = await selectCategoryName(categoryId);
	const categories = await selectAllCategories();
	const items = await selectAllItems(categoryId);

	res.render('index', { title, categories, items });
};

export { getIndex };
