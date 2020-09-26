import * as Router from 'koa-router';

const router = new Router();

import * as upcomingInterviewController from '../controller/upcomingInterview';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/upcoming-interview', isUserLoggedIn, upcomingInterviewController.createUpcomingInterview);
router.get('/api/upcoming-interview', isUserLoggedIn, upcomingInterviewController.getUpcomingInterview);

export default router;
