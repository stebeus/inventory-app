import {
	selectAllCategories,
	selectCategory,
	selectItemCount,
} from '#root/db/queries.js';
import { toKebabCase } from '#root/utils/formatters.js';

const getManageCategories = async (req, res) => {
	const {
		params: { categoryId },
	} = req;

	const category = await selectCategory(categoryId);
	const categories = await selectAllCategories();
	const itemCount = await selectItemCount(categoryId);

	res.render('manage-categories', {
		title: category.name,
		categories,
		category,
		itemCount,
		toKebabCase,
	});
};

export { getManageCategories };
