import { Router } from 'express';

import { getItem } from '#root/controllers/item.js';

const router = Router();

router.get('/categories/:categoryId/item/:itemId/', getItem);

export { router as item };
