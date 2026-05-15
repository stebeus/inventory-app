import { Router } from 'express';

import { getIndex } from '#root/controllers/index.js';

const router = Router();

router.get('/', getIndex);

export { router as index };
