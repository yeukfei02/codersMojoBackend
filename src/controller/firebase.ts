import Koa from 'koa';
import admin from 'firebase-admin';
import _ from 'lodash';

import { getUserById } from '../service/user';
import { getFirebaseDetailsByCurrentToken, addTokenToFirebaseDetails } from '../service/firebase';

const serviceAccount = {
  type: process.env.FIREBASE_ADMIN_TYPE,
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};
const serviceAccountStr = JSON.stringify(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccountStr)),
});

export const addTokenToFirebaseDetailsFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const currentToken = ctx.request.body.currentToken;
  const refreshedToken = ctx.request.body.refreshedToken;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (users_id) {
    const firebaseDetails = await getFirebaseDetailsByCurrentToken(currentToken);
    if (_.isEmpty(firebaseDetails)) {
      await addTokenToFirebaseDetails(currentToken, refreshedToken, users_id);
      ctx.response.status = 201;
      ctx.body = {
        message: 'addTokenToFirebaseDetails',
      };
    } else {
      ctx.response.status = 201;
      ctx.body = {
        message: 'addTokenToFirebaseDetails, this firebase current token already added',
      };
    }
  }
};

export const subscribeTopic = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const registrationTokenList = ctx.request.body.registrationTokenList;
  const topic = ctx.request.body.topic;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (users_id) {
    const user = await getUserById(users_id);
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
    const user = await getUserById(users_id);
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
