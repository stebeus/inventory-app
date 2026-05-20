import { Router } from 'express';

import { deleteItem, getItem } from '#root/controllers/item.js';

const router = Router();

router.get('/categories/:categoryId/item/:itemId/', getItem);

router.post('/delete-item/:categoryId/:itemId', deleteItem);

export { router as item };
