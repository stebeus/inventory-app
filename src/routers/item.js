import { Router } from 'express';

import { getItem, postDeleteItem } from '#root/controllers/item.js';

const router = Router();

router.get('/categories/:categoryId/item/:itemId/', getItem);

router.post('/delete-item/:categoryId/:itemId', postDeleteItem);

export { router as item };
