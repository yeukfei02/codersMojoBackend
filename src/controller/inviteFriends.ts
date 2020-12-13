import Koa from 'koa';
import crypto from 'crypto';
import _ from 'lodash';

import { getInviteFriendsByUsersId, createInviteFriends } from '../service/inviteFriends';
import { getUserById } from '../service/user';

import { sendInviteFriendsEmail } from '../common/common';

export const sendInviteFriendsEmailFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const email = ctx.request.body.email;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (email) {
    const user = await getUserById(users_id);
    const username = `${user.first_name} ${user.last_name}`;
    sendInviteFriendsEmail(email, username);

    ctx.response.status = 200;
    ctx.body = {
      message: 'sendInviteFriendsEmail',
    };
  }
};

export const getShareYourInviteLink = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const hostname = ctx.query.hostname;
  const users_id = parseInt(ctx.params.users_id, 10);

  if (users_id) {
    const existingInviteFriends = await getInviteFriendsByUsersId(users_id);

    let inviteLink = '';
    if (_.isEmpty(existingInviteFriends)) {
      const generatedText = crypto.randomBytes(20).toString('hex');
      inviteLink = `${hostname}${generatedText}`;
      await createInviteFriends(inviteLink, generatedText, users_id);
    } else {
      inviteLink = existingInviteFriends[0].invite_link;
    }

    ctx.response.status = 200;
    ctx.body = {
      message: 'getShareYourInviteLink',
      inviteLink: inviteLink,
    };
  }
};
