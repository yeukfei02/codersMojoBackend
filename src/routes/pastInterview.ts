import * as Router from 'koa-router';

const router = new Router();

import * as pastInterviewController from '../controller/pastInterview';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/past-interview', isUserLoggedIn, pastInterviewController.createPastInterview);
router.get('/api/past-interview', isUserLoggedIn, pastInterviewController.getPastInterview);

export default router;
