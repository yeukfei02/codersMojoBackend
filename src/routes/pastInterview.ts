import Router from 'koa-router';

const router = new Router();

import { createPastInterviewFunc, getPastInterviewFunc } from '../controller/pastInterview';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/past-interview', isUserLoggedIn, createPastInterviewFunc);
router.get('/api/past-interview', isUserLoggedIn, getPastInterviewFunc);

export default router;
