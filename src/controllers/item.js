import * as itemModel from '#root/db/models/items.js';

const getItem = async (req, res) => {
	const {
		params: { categoryId, itemId },
	} = req;

	const item = await itemModel.getItem(itemId);

	res.render('item', { title: item.name, item, categoryId });
};

const deleteItem = async (req, res) => {
	const {
		params: { categoryId, itemId },
	} = req;

	await itemModel.deleteItem(itemId);

	res.redirect(`/categories/${categoryId}/`);
};

export { deleteItem, getItem };
