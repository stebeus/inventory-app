import vine from '@vinejs/vine';

import * as categoryModel from '#root/db/models/categories.js';
import * as itemModel from '#root/db/models/items.js';

const BAD_REQUEST_CODE = 400;

const sharedFields = {
	name: vine.string().minLength(1).maxLength(25),
	imgUrl: vine.string().url(),
};

const renderForm = (
	res,
	{ title, action, errors, hasDescription, values = [] },
	status = 201,
) =>
	res
		.status(status)
		.render('form', { title, action, errors, hasDescription, values });

// Category forms

const categorySchema = vine.object(sharedFields);

const renderCreateCategory = (res, status, errors) =>
	renderForm(
		res,
		{ title: 'Create category', action: 'create-category', errors },
		status,
	);

const renderEditCategory = async (req, res, status, errors) => {
	const {
		params: { categoryId },
	} = req;

	const { name, imgUrl } = await categoryModel.getCategory(categoryId);

	renderForm(
		res,
		{
			title: `Edit ${name}`,
			action: `edit-category/${categoryId}`,
			errors,
			values: [name, imgUrl],
		},
		status,
	);
};

const getCreateCategory = (req, res) => renderCreateCategory(res);

const getEditCategory = (req, res) => renderEditCategory(req, res);

const createCategory = async (req, res) => {
	try {
		const validatedData = await vine.validate({
			schema: categorySchema,
			data: req.body,
		});
		const { name, imgUrl } = validatedData;

		await categoryModel.createCategory(name, imgUrl);

		res.redirect('/manage-categories/');
	} catch (error) {
		return renderCreateCategory(res, BAD_REQUEST_CODE, error.messages);
	}
};

const editCategory = async (req, res) => {
	const {
		body,
		params: { categoryId },
	} = req;

	try {
		const validatedData = await vine.validate({
			schema: categorySchema,
			data: body,
		});
		const { name, imgUrl } = validatedData;

		await categoryModel.updateCategory(name, imgUrl, categoryId);

		res.redirect(`/manage-categories/${categoryId}/`);
	} catch (error) {
		return renderEditCategory(req, res, BAD_REQUEST_CODE, error.messages);
	}
};

// Item forms

const itemSchema = vine.object({
	...sharedFields,
	description: vine.string().minLength(1).maxLength(250),
});

const renderCreateItem = (req, res, status, errors) => {
	const {
		params: { categoryId },
	} = req;

	renderForm(
		res,
		{
			title: 'Create item',
			action: `create-item/${categoryId}`,
			errors,
			hasDescription: true,
		},
		status,
	);
};

const renderEditItem = async (req, res, status, errors) => {
	const {
		params: { categoryId, itemId },
	} = req;

	const { name, description, imgUrl } = await itemModel.getItem(itemId);

	renderForm(
		res,
		{
			title: `Edit ${name}`,
			action: `edit-item/${categoryId}/${itemId}`,
			errors,
			hasDescription: true,
			values: [name, description, imgUrl],
		},
		status,
	);
};

const getCreateItem = (req, res) => renderCreateItem(req, res);

const getEditItem = (req, res) => renderEditItem(req, res);

const createItem = async (req, res) => {
	const {
		body,
		params: { categoryId },
	} = req;

	try {
		const validatedData = await vine.validate({
			schema: itemSchema,
			data: body,
		});

		const { name, description, imgUrl } = validatedData;

		await itemModel.createItem(categoryId, name, description, imgUrl);

		res.redirect(`/manage-categories/${categoryId}/`);
	} catch (error) {
		return renderCreateItem(req, res, BAD_REQUEST_CODE, error.messages);
	}
};

const editItem = async (req, res) => {
	const {
		body,
		params: { categoryId, itemId },
	} = req;

	try {
		const validatedData = await vine.validate({
			schema: itemSchema,
			data: body,
		});

		const { name, description, imgUrl } = validatedData;

		await itemModel.updateItem(name, description, imgUrl, itemId);

		res.redirect(`/categories/${categoryId}/item/${itemId}/`);
	} catch (error) {
		return renderEditItem(req, res, BAD_REQUEST_CODE, error.messages);
	}
};

export {
	createCategory,
	createItem,
	editCategory,
	editItem,
	getCreateCategory,
	getCreateItem,
	getEditCategory,
	getEditItem,
};
