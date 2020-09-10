import * as Koa from 'koa';
const mailchimp = require('@mailchimp/mailchimp_marketing');
import * as md5 from 'md5';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us2',
});

export const addContactToAudience = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const listId = process.env.MAILCHIMP_AUDIENCE_ID;
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: ctx.request.body.email,
    status: 'subscribed',
  });

  if (response && response.id) {
    ctx.response.status = 201;
    ctx.body = {
      message: 'mailchimp add contact to audience',
    };
  } else {
    ctx.response.status = 400;
    ctx.body = {
      message: 'mailchimp add contact to audience error',
    };
  }
};

export const checkContactSubscriptionStatus = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const listId = process.env.MAILCHIMP_AUDIENCE_ID;
  const subscriberHash = md5(ctx.request.body.email.toLowerCase());

  const response = await mailchimp.lists.getListMember(listId, subscriberHash);

  if (response && response.id) {
    ctx.response.status = 200;
    ctx.body = {
      message: 'mailchimp check contact subscription status',
      subscriptionStatus: response.status,
    };
  } else {
    ctx.response.status = 400;
    ctx.body = {
      message: 'mailchimp check contact subscription status error',
    };
  }
};

export const unsubscripeContact = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const listId = process.env.MAILCHIMP_AUDIENCE_ID;
  const subscriberHash = md5(ctx.request.body.email.toLowerCase());

  const response = await mailchimp.lists.updateListMember(listId, subscriberHash, {
    status: 'unsubscribed',
  });

  if (response && response.id) {
    ctx.response.status = 200;
    ctx.body = {
      message: 'mailchimp unsubscripe contact',
      subscriptionStatus: response.status,
    };
  } else {
    ctx.response.status = 400;
    ctx.body = {
      message: 'mailchimp unsubscripe contact error',
    };
  }
};
