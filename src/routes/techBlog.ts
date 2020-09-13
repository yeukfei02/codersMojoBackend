import * as Router from 'koa-router';

const router = new Router();

import * as techBlogController from '../controller/techBlog';

router.post('/api/tech-blog', techBlogController.createTechBlog);
router.get('/api/tech-blog', techBlogController.getTechBlog);

export default router;
