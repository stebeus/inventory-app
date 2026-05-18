import { kebabCase } from 'change-case';

import { deleteItem, selectItem } from '#root/db/queries.js';

const getItem = async (req, res) => {
	const {
		params: { itemId },
	} = req;

	const item = await selectItem(itemId);

	res.render('item', { title: item.name, item, kebabCase });
};

const postDeleteItem = async (req, res) => {
	const {
		params: { categoryId, itemId },
	} = req;

	await deleteItem(itemId);

	res.redirect(`/categories/${categoryId}`);
};

export { getItem, postDeleteItem };
