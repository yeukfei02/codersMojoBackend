import Router from 'koa-router';

const router = new Router();

import { createPostsFunc, getPostsFunc, addPostsLikeCountFunc, deletePostsByIdFunc } from '../controller/posts';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/posts', isUserLoggedIn, createPostsFunc);
router.get('/api/posts', isUserLoggedIn, getPostsFunc);
router.patch('/api/posts/:postsId', isUserLoggedIn, addPostsLikeCountFunc);
router.delete('/api/posts/:postsId', isUserLoggedIn, deletePostsByIdFunc);

export default router;
