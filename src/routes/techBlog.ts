import Router from 'koa-router';

const router = new Router();

import { uploadTechBlogFile, createTechBlogFunc, getTechBlogFunc } from '../controller/techBlog';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/tech-blog/upload-file', isUserLoggedIn, uploadTechBlogFile);
router.post('/api/tech-blog', isUserLoggedIn, createTechBlogFunc);
router.get('/api/tech-blog', getTechBlogFunc);

export default router;
