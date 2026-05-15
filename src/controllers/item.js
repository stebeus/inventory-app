import { selectItem } from '#root/db/queries.js';

const getItem = async (req, res) => {
	const {
		params: { categoryId, itemId },
	} = req;

	const item = await selectItem(categoryId, itemId);

	res.render('item', { title: item.name, item });
};

export { getItem };
