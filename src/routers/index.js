import { Router } from 'express';

import { getIndex, getSearch } from '#root/controllers/index.js';

const router = Router();

router.get('/', getIndex);
router.get('/categories/:categoryId/', getIndex);
router.get('/search', getSearch);

export { router as index };
