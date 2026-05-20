import { Router } from 'express';

import {
	deleteCategory,
	getManageCategories,
} from '#root/controllers/manage-categories.js';

const router = Router();

router.get('/manage-categories/', getManageCategories);
router.get('/manage-categories/:categoryId/', getManageCategories);

router.post('/delete-category/:categoryId', deleteCategory);

export { router as manageCategories };
