import { Router } from 'express';

import {
	getCreateCategory,
	getCreateItem,
	getEditCategory,
	getEditItem,
	postCreateCategory,
	postCreateItem,
	postEditCategory,
	postEditItem,
} from '#root/controllers/form.js';

const router = Router();

const CREATE_CATEGORY = '/create-category';
const CREATE_ITEM = '/create-item/:categoryId';
const EDIT_CATEGORY = '/edit-category/:categoryId';
const EDIT_ITEM = '/edit-item/:itemId';

router.get(CREATE_CATEGORY, getCreateCategory);
router.get(CREATE_ITEM, getCreateItem);
router.get(EDIT_CATEGORY, getEditCategory);
router.get(EDIT_ITEM, getEditItem);

router.post(CREATE_CATEGORY, postCreateCategory);
router.post(CREATE_ITEM, postCreateItem);
router.post(EDIT_CATEGORY, postEditCategory);
router.post(EDIT_ITEM, postEditItem);

export { router as form };
