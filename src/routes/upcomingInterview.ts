import * as Router from 'koa-router';

const router = new Router();

import * as upcomingInterviewController from '../controller/upcomingInterview';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/upcoming-interview', isUserLoggedIn, upcomingInterviewController.createUpcomingInterview);
router.get('/api/upcoming-interview', isUserLoggedIn, upcomingInterviewController.getUpcomingInterview);
router.put(
  '/api/upcoming-interview/cancel-upcoming-interview/:upcomingInterviewId',
  isUserLoggedIn,
  upcomingInterviewController.cancelUpcomingInterview,
);
router.put(
  '/api/upcoming-interview/reschedule-upcoming-interview/:upcomingInterviewId',
  isUserLoggedIn,
  upcomingInterviewController.rescheduleUpcomingInterview,
);

export default router;
