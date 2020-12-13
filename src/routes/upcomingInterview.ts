import Router from 'koa-router';

const router = new Router();

import {
  createUpcomingInterviewFunc,
  getUpcomingInterviewFunc,
  cancelUpcomingInterviewFunc,
  rescheduleUpcomingInterviewFunc,
} from '../controller/upcomingInterview';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/upcoming-interview', isUserLoggedIn, createUpcomingInterviewFunc);
router.get('/api/upcoming-interview', isUserLoggedIn, getUpcomingInterviewFunc);
router.put(
  '/api/upcoming-interview/cancel-upcoming-interview/:upcomingInterviewId',
  isUserLoggedIn,
  cancelUpcomingInterviewFunc,
);
router.put(
  '/api/upcoming-interview/reschedule-upcoming-interview/:upcomingInterviewId',
  isUserLoggedIn,
  rescheduleUpcomingInterviewFunc,
);

export default router;
