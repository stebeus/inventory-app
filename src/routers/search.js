import { Router } from 'express';

import { getSearch } from '#root/controllers/search.js';

const router = Router();

router.get('/search', getSearch);

export { router as search };
