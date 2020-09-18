import * as Router from 'koa-router';

const router = new Router();

import * as hackathonsController from '../controller/hackathons';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/hackathons', hackathonsController.createHackathons);
router.get('/api/hackathons', isUserLoggedIn, hackathonsController.getHackathons);

export default router;
