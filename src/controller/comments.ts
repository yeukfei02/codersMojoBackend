import * as Koa from 'koa';

import * as commentsService from '../service/comments';

export const createComments = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const commentsText = ctx.request.body.commentsText;
  const posts_id = parseInt(ctx.request.body.posts_id, 10);
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (commentsText && posts_id && users_id) {
    await commentsService.createComments(commentsText, posts_id, users_id);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createComments',
    };
  }
};
