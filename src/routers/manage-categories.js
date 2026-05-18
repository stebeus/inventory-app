import { Router } from 'express';

import { getManageCategories } from '#root/controllers/manage-categories.js';

const router = Router();

router.get('/manage-categories/', getManageCategories);
router.get('/manage-categories/:categoryId/', getManageCategories);

export { router as manageCategories };
