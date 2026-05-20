import * as categoryModel from '#root/db/models/categories.js';
import { getItemCount } from '#root/db/models/items.js';

const getManageCategories = async (req, res) => {
	const {
		params: { categoryId },
	} = req;

	if (categoryId == null) res.redirect('/manage-categories/1/');

	const category = await categoryModel.getCategory(categoryId);
	const categories = await categoryModel.getAllCategories();
	const itemCount = await getItemCount(categoryId);

	res.render('index', {
		title: category.name,
		categories,
		category,
		itemCount,
	});
};

const deleteCategory = async (req, res) => {
	const {
		params: { categoryId },
	} = req;

	await categoryModel.deleteCategory(categoryId);

	res.redirect('/manage-categories/');
};

export { deleteCategory, getManageCategories };
