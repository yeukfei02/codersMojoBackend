import * as Router from 'koa-router';

const router = new Router();

import * as inviteFriendsController from '../controller/inviteFriends';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/invite-friends', isUserLoggedIn, inviteFriendsController.sendInviteFriendsEmailFunc);
router.get(
  '/api/invite-friends/get-share-your-invite-link/:users_id',
  isUserLoggedIn,
  inviteFriendsController.getShareYourInviteLink,
);

export default router;
