import * as Router from 'koa-router';

const router = new Router();

import * as techBlogController from '../controller/techBlog';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/tech-blog/upload-file', isUserLoggedIn, techBlogController.uploadTechBlogFile);
router.post('/api/tech-blog', isUserLoggedIn, techBlogController.createTechBlog);
router.get('/api/tech-blog', techBlogController.getTechBlog);

export default router;
