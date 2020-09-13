import * as Koa from 'koa';

import * as techBlogService from '../service/techBlog';

export const createTechBlog = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const title = ctx.request.body.title;
  const description = ctx.request.body.description;
  const tag = ctx.request.body.tag;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (title && description && tag && users_id) {
    await techBlogService.createTechBlog(title, description, tag, users_id);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createTechBlog',
    };
  }
};

export const getTechBlog = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const tag = ctx.query.tag;

  let techBlogList = [];
  if (!tag) {
    techBlogList = await techBlogService.getTechBlog();
  } else {
    techBlogList = await techBlogService.getTechBlogByTag(tag);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getTechBlog',
    result: techBlogList,
  };
};
