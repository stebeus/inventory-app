import { kebabCase } from 'change-case';

import { selectItem } from '#root/db/queries.js';

const getItem = async (req, res) => {
	const {
		params: { itemId },
	} = req;

	const item = await selectItem(itemId);

	res.render('item', { title: item.name, item, kebabCase });
};

export { getItem };
