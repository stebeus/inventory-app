import { camelCase, kebabCase } from 'change-case';
import { body, matchedData, validationResult } from 'express-validator';

import {
	insertCategory,
	insertItem,
	selectCategory,
	selectItem,
	updateCategory,
	updateItem,
} from '#root/db/queries.js';

// Constants

const MANAGE_CATEGORIES_ROUTE = '/manage-categories/';

// Validations

const createTextValidation = ({ field, min = 1, max }) =>
	body(field)
		.trim()
		.isLength({ min, max })
		.withMessage(`Must be between ${min} and ${max} characters`);

const nameValidation = createTextValidation({ field: 'name', max: 25 });

const descriptionValidation = createTextValidation({
	field: 'description',
	max: 250,
});

const imageLinkValidation = body('imageLink')
	.trim()
	.notEmpty()
	.withMessage('Must not be empty')
	.isURL()
	.withMessage('Must be a valid URL');

const categoryValidations = [nameValidation, imageLinkValidation];

const itemValidations = [
	nameValidation,
	imageLinkValidation,
	descriptionValidation,
];

// Form renders

const renderForm = ({ title, action, errors, hasDescription, values = [] }) => [
	'form',
	{ title, action, errors, hasDescription, values, camelCase, kebabCase },
];

const renderFormWithErrors = (res, { errors, ...properties }) =>
	res.status(400).render(
		...renderForm({
			errors: errors.array(),
			...properties,
		}),
	);

// Getters

const getCreateCategory = (req, res) =>
	res.render(
		...renderForm({ title: 'Create category', action: 'create-category' }),
	);

const getCreateItem = (req, res) => {
	const {
		params: { categoryId },
	} = req;

	res.render(
		...renderForm({
			title: 'Create item',
			action: `create-item/${categoryId}`,
			hasDescription: true,
		}),
	);
};

const getEditCategory = async (req, res) => {
	const {
		params: { categoryId },
	} = req;

	const { name, img_url } = await selectCategory(categoryId);

	res.render(
		...renderForm({
			title: `Edit ${name}`,
			action: `edit-category/${categoryId}`,
			values: [name, img_url],
		}),
	);
};

const getEditItem = async (req, res) => {
	const {
		params: { itemId },
	} = req;

	const { name, img_url, description } = await selectItem(itemId);

	res.render(
		...renderForm({
			title: `Edit ${name}`,
			action: `edit-item/${itemId}`,
			hasDescription: true,
			values: [name, img_url, description],
		}),
	);
};

// Posters

const postCreateCategory = [
	categoryValidations,
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return renderFormWithErrors(res, {
				errors,
				title: 'Create category',
				action: 'create-category',
			});
		}

		const { name, imageLink } = matchedData(req);
		await insertCategory(name, imageLink);

		res.redirect('/manage-categories/');
	},
];

const postCreateItem = [
	itemValidations,
	async (req, res) => {
		const {
			params: { categoryId },
		} = req;

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return renderFormWithErrors(res, {
				errors,
				title: 'Create item',
				action: `create-item/${categoryId}`,
				hasDescription: true,
			});
		}

		const { name, imageLink, description } = matchedData(req);
		await insertItem(categoryId, name, imageLink, description);

		res.redirect(`/manage-categories/${categoryId}/`);
	},
];

const postEditCategory = [
	categoryValidations,
	async (req, res) => {
		const {
			params: { categoryId },
		} = req;

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const { name } = await selectCategory(categoryId);

			return renderFormWithErrors(res, {
				errors,
				title: `Edit ${name}`,
				action: `edit-category/${categoryId}`,
			});
		}

		const { name, imageLink } = matchedData(req);
		await updateCategory(name, imageLink, categoryId);

		res.redirect(`/manage-categories/${categoryId}/`);
	},
];

const postEditItem = [
	itemValidations,
	async (req, res) => {
		const {
			params: { categoryId, itemId },
		} = req;

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const { name } = await selectItem(itemId);

			return renderFormWithErrors(res, {
				errors,
				title: `Edit ${name}`,
				action: `edit-item/${itemId}`,
				hasDescription: true,
			});
		}

		const { name, imageLink, description } = matchedData(req);
		await updateItem(name, imageLink, description, itemId);

		res.redirect(`/categories/${categoryId}/item/${itemId}`);
	},
];

export {
	getCreateCategory,
	getCreateItem,
	getEditCategory,
	getEditItem,
	postCreateCategory,
	postCreateItem,
	postEditCategory,
	postEditItem,
};
