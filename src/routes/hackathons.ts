import Router from 'koa-router';

const router = new Router();

import { createHackathonsFunc, getHackathonsFunc } from '../controller/hackathons';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/hackathons', createHackathonsFunc);
router.get('/api/hackathons', isUserLoggedIn, getHackathonsFunc);

export default router;
