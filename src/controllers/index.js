import { kebabCase } from 'change-case';

import {
	selectAllCategories,
	selectAllItems,
	selectCategory,
} from '#root/db/queries.js';

const getIndex = async (req, res) => {
	const {
		params: { categoryId },
	} = req;

	if (categoryId == null) res.redirect('/categories/1/');

	const { name } = await selectCategory(categoryId);
	const categories = await selectAllCategories();
	const items = await selectAllItems(categoryId);

	res.render('index', { title: name, categories, items, kebabCase });
};

export { getIndex };
