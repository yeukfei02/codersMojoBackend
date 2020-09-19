import * as Koa from 'koa';
import * as asyncBusboy from 'async-busboy';

import { uploadFileToS3 } from '../common/common';

import * as techBlogService from '../service/techBlog';

export const uploadTechBlogFile = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const { files, fields } = await asyncBusboy(ctx.req);

  const filePath = files[0].path;
  const fileName = (files[0] as any).filename;

  const imageUrl = await uploadFileToS3(filePath, fileName);

  ctx.response.status = 201;
  ctx.body = {
    message: 'uploadTechBlogFile',
    imageUrl: imageUrl,
  };
};

export const createTechBlog = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const image = ctx.request.body.image;
  const title = ctx.request.body.title;
  const description = ctx.request.body.description;
  const tag = ctx.request.body.tag;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (title && description && tag && users_id) {
    await techBlogService.createTechBlog(
      image ||
        'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1010&q=80',
      title,
      description,
      tag,
      users_id,
    );

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
