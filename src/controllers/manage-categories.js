import { camelCase, kebabCase } from 'change-case';

import {
	selectAllCategories,
	selectCategory,
	selectItemCount,
} from '#root/db/queries.js';

const getManageCategories = async (req, res) => {
	const {
		params: { categoryId },
	} = req;

	if (categoryId == null) res.redirect('/manage-categories/1');

	const category = await selectCategory(categoryId);
	const categories = await selectAllCategories();
	const itemCount = await selectItemCount(categoryId);

	res.render('manage-categories', {
		title: category.name,
		categories,
		category,
		itemCount,
		camelCase,
		kebabCase,
	});
};

export { getManageCategories };
