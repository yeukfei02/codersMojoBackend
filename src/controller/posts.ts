import * as Koa from 'koa';

import * as postsService from '../service/posts';

export const createPosts = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const title = ctx.request.body.title;
  const description = ctx.request.body.description;
  const tag = ctx.request.body.tag;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (title && description && tag && users_id) {
    await postsService.createPosts(title, description, tag, users_id);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createPosts',
    };
  }
};

export const getPosts = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const tag = ctx.query.tag;

  let postsList = [];
  if (!tag) {
    postsList = await postsService.getPosts();
  } else {
    postsList = await postsService.getPostsByTag(tag);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getPosts',
    result: postsList,
  };
};
