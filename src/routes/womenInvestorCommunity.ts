import * as Router from 'koa-router';

const router = new Router();

import * as womenInvestorCommunityController from '../controller/womenInvestorCommunity';

import { isUserLoggedIn } from '../middleware/middleware';

router.post(
  '/api/women-investor-community',
  isUserLoggedIn,
  womenInvestorCommunityController.createWomenInvestorCommunity,
);
router.get('/api/women-investor-community', isUserLoggedIn, womenInvestorCommunityController.getWomenInvestorCommunity);

export default router;
