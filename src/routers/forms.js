import { Router } from 'express';

import {
	createCategory,
	createItem,
	editCategory,
	editItem,
	getCreateCategory,
	getCreateItem,
	getEditCategory,
	getEditItem,
} from '#root/controllers/forms.js';

const router = Router();

router.get('/create-category', getCreateCategory);
router.get('/edit-category/:categoryId', getEditCategory);
router.get('/create-item/:categoryId', getCreateItem);
router.get('/edit-item/:itemId', getEditItem);

router.post('/create-category', createCategory);
router.post('/create-item/:categoryId', createItem);
router.post('/edit-category/:categoryId', editCategory);
router.post('/edit-item/:itemId', editItem);

export { router as forms };
