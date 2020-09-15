import * as Router from 'koa-router';

const router = new Router();

import * as postsController from '../controller/posts';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/posts', isUserLoggedIn, postsController.createPosts);
router.get('/api/posts', isUserLoggedIn, postsController.getPosts);

export default router;
