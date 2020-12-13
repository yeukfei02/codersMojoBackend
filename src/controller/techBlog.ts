import Koa from 'koa';

import { uploadFileToS3 } from '../common/common';

import { createTechBlog, getTechBlog, getTechBlogByTag } from '../service/techBlog';

export const uploadTechBlogFile = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const files = (ctx.request as any).files;

  const filePath = files.file.path;
  const fileName = files.file.name;

  const imageUrl = await uploadFileToS3(filePath, fileName);

  ctx.response.status = 201;
  ctx.body = {
    message: 'uploadTechBlogFile',
    imageUrl: imageUrl,
  };
};

export const createTechBlogFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const image = ctx.request.body.image;
  const title = ctx.request.body.title;
  const description = ctx.request.body.description;
  const tag = ctx.request.body.tag;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (image && title && description && tag && users_id) {
    await createTechBlog(image, title, description, tag, users_id);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createTechBlog',
    };
  }
};

export const getTechBlogFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const tag = ctx.query.tag;

  let techBlogList = [];
  if (!tag) {
    techBlogList = await getTechBlog();
  } else {
    techBlogList = await getTechBlogByTag(tag);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getTechBlog',
    result: techBlogList,
  };
};
