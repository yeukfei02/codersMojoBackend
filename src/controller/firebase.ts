import * as Koa from 'koa';
import * as admin from 'firebase-admin';

import * as userService from '../service/user';
import * as firebaseService from '../service/firebase';

const serviceAccountJSON = require('../../codersmojo-firebase-adminsdk-2s2t9-1d9712deb2.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJSON),
});

export const addTokenToFirebaseDetails = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const currentToken = ctx.request.body.currentToken;
  const refreshedToken = ctx.request.body.refreshedToken;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (users_id) {
    const user = await userService.getUserById(users_id);
    if (!user) {
      await firebaseService.addTokenToFirebaseDetails(currentToken, refreshedToken, users_id);
      ctx.response.status = 201;
      ctx.body = {
        message: 'addTokenToFirebaseDetails',
      };
    } else {
      ctx.response.status = 201;
      ctx.body = {
        message: 'addTokenToFirebaseDetails, this user firebase current token alreday added',
      };
    }
  }
};

export const subscribeTopic = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const registrationTokenList = ctx.request.body.registrationTokenList;
  const topic = ctx.request.body.topic;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (users_id) {
    const user = await userService.getUserById(users_id);
    if (user) {
      const response = await admin.messaging().subscribeToTopic(registrationTokenList, topic);
      console.log('response = ', response);

      if (response.successCount > 0) {
        ctx.response.status = 201;
        ctx.body = {
          message: 'subscribeTopic',
        };
      } else {
        ctx.response.status = 400;
        ctx.body = {
          message: 'subscribeTopic error',
        };
      }
    }
  }
};

export const unsubscribeTopic = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const registrationTokenList = ctx.request.body.registrationTokenList;
  const topic = ctx.request.body.topic;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (users_id) {
    const user = await userService.getUserById(users_id);
    if (user) {
      const response = await admin.messaging().unsubscribeFromTopic(registrationTokenList, topic);
      console.log('response = ', response);

      if (response.successCount > 0) {
        ctx.response.status = 201;
        ctx.body = {
          message: 'unsubscribeTopic',
        };
      } else {
        ctx.response.status = 400;
        ctx.body = {
          message: 'unsubscribeTopic error',
        };
      }
    }
  }
};
