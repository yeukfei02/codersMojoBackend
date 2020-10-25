import * as Koa from 'koa';

import * as postsService from '../service/posts';
import * as commentsService from '../service/comments';
import * as userService from '../service/user';

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

  const formattedPostsList: any[] = [];
  if (postsList) {
    for (let i = 0; i < postsList.length; i++) {
      const item = postsList[i];
      const posts_id = item.posts_id;

      const commentResultList: any[] = [];
      const commentList = await commentsService.getCommentsByPostsId(posts_id);
      for (let index = 0; index < commentList.length; index++) {
        const comment = commentList[index];

        const commentText = comment.comments_text;
        const users_id = comment.users_id;

        const user = await userService.getUserById(users_id);
        const name = `${user.first_name} ${user.last_name}`;

        const commentResult = {
          name: name,
          commentText: commentText,
        };
        commentResultList.push(commentResult);
      }

      const data = {
        commentResultList: commentResultList,
      };
      const newItem = Object.assign(item, data);
      formattedPostsList.push(newItem);
    }
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getPosts',
    result: formattedPostsList,
  };
};

export const addPostsLikeCount = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const posts_id = parseInt(ctx.params.postsId, 10);

  await postsService.addPostsLikeCount(posts_id);

  ctx.response.status = 200;
  ctx.body = {
    message: 'addPostsLikeCount',
  };
};

export const deletePostsById = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const postsId = parseInt(ctx.params.postsId, 10);

  try {
    if (postsId) {
      await commentsService.deleteCommentsByPostsId(postsId);
      const result = await postsService.deletePostsById(postsId);

      ctx.response.status = 200;
      ctx.body = {
        message: 'deletePostsById',
        result: result,
      };
    }
  } catch (e) {
    console.log('error = ', e);

    ctx.response.status = 400;
    ctx.body = {
      message: 'deletePostsById error, no this postsId or posts already delete',
    };
  }
};
