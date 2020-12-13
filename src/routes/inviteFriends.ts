import Router from 'koa-router';

const router = new Router();

import { sendInviteFriendsEmailFunc, getShareYourInviteLink } from '../controller/inviteFriends';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/invite-friends', isUserLoggedIn, sendInviteFriendsEmailFunc);
router.get('/api/invite-friends/get-share-your-invite-link/:users_id', isUserLoggedIn, getShareYourInviteLink);

export default router;
