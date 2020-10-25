import * as Router from 'koa-router';

const router = new Router();

import * as commentsController from '../controller/comments';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/comments', isUserLoggedIn, commentsController.createComments);

export default router;
