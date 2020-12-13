import Router from 'koa-router';

const router = new Router();

import {
  uploadWomenInvestorCommunityFile,
  createWomenInvestorCommunityFunc,
  getWomenInvestorCommunityFunc,
} from '../controller/womenInvestorCommunity';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/women-investor-community/upload-file', isUserLoggedIn, uploadWomenInvestorCommunityFile);
router.post('/api/women-investor-community', isUserLoggedIn, createWomenInvestorCommunityFunc);
router.get('/api/women-investor-community', isUserLoggedIn, getWomenInvestorCommunityFunc);

export default router;
