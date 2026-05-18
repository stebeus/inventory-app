import { Router } from 'express';

import {
	getManageCategories,
	postDeleteCategory,
} from '#root/controllers/manage-categories.js';

const router = Router();

router.get('/manage-categories/', getManageCategories);
router.get('/manage-categories/:categoryId/', getManageCategories);

router.post('/delete-category/:categoryId', postDeleteCategory);

export { router as manageCategories };
