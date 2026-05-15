import { selectItem } from '#root/db/queries.js';
import { toKebabCase } from '#root/utils/formatters.js';

const getItem = async (req, res) => {
	const {
		params: { itemId },
	} = req;

	const item = await selectItem(itemId);

	res.render('item', { title: item.name, item, toKebabCase });
};

export { getItem };
