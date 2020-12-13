import Router from 'koa-router';

const router = new Router();

import { createCommentsFunc } from '../controller/comments';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/comments', isUserLoggedIn, createCommentsFunc);

export default router;
