import {
	selectAllCategories,
	selectCategoryName,
	selectItemCount,
} from '#root/db/queries.js';

const getManageCategories = async (req, res) => {
	const {
		params: { categoryId },
	} = req;

	const title = await selectCategoryName(categoryId);
	const categories = await selectAllCategories();
	const itemCount = await selectItemCount(categoryId);

	res.render('manage-categories', { title, categories, itemCount });
};

export { getManageCategories };
