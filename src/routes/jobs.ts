import * as Router from 'koa-router';

const router = new Router();

import * as jobsController from '../controller/jobs';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/jobs', jobsController.createJobs);
router.get('/api/jobs', isUserLoggedIn, jobsController.getJobs);

export default router;
