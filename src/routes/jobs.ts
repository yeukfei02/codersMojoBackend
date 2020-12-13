import Router from 'koa-router';

const router = new Router();

import { createJobsFunc, getJobsFunc } from '../controller/jobs';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/jobs', createJobsFunc);
router.get('/api/jobs', isUserLoggedIn, getJobsFunc);

export default router;
