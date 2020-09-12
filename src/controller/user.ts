import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

import * as userService from '../service/user';
import { sendForgotPasswordEmail } from '../common/common';

export const signup = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const email = ctx.request.body.email;
  const password = bcrypt.hashSync(ctx.request.body.password, 10);

  if (email && password) {
    const record = await userService.getUserByEmail(email);
    if (!record) {
      await userService.createUser(email, password);

      ctx.response.status = 201;
      ctx.body = {
        message: 'signup',
      };
    } else {
      ctx.response.status = 400;
      ctx.body = {
        message: 'signup error, email already exists',
      };
    }
  }
};

export const login = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;

  if (email && password) {
    const user = await userService.getUserByEmail(email);
    if (user) {
      const userPasswordFromDB = user.password;

      if (bcrypt.compareSync(password, userPasswordFromDB)) {
        const token = jwt.sign(
          {
            id: uuidv4(),
          },
          process.env.JWT_SECRET,
          { expiresIn: '1d' },
        );

        const userData = {
          users_id: user.users_id,
          email: user.email,
        };

        ctx.response.status = 200;
        ctx.body = {
          message: 'login',
          token: token,
          user: userData,
        };
      } else {
        ctx.response.status = 400;
        ctx.body = {
          message: 'login error, wrong password',
        };
      }
    } else {
      ctx.response.status = 400;
      ctx.body = {
        message: 'login error, no user found',
      };
    }
  }
};

export const forgotPassword = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const email = ctx.request.body.email;

  if (email) {
    const user = await userService.getUserByEmail(email);
    if (user) {
      const id = user.users_id;
      const newPassword = crypto.randomBytes(20).toString('hex');
      const newPasswordHash = bcrypt.hashSync(newPassword, 10);

      sendForgotPasswordEmail(email, newPassword);

      const result = await userService.updateUserPassword(id, newPasswordHash);
      if (result) {
        ctx.response.status = 200;
        ctx.body = {
          message: 'forgotPassword',
        };
      }
    } else {
      ctx.response.status = 400;
      ctx.body = {
        message: 'forgotPassword error, no this user',
      };
    }
  } else {
    ctx.response.status = 400;
    ctx.body = {
      message: 'forgotPassword error, no email',
    };
  }
};

export const changePassword = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const id = parseInt(ctx.params.id, 10);
  const oldPassword = ctx.request.body.oldPassword;
  const newPassword = ctx.request.body.newPassword;

  if (id) {
    const user = await userService.getUserById(id);
    if (user) {
      const userPasswordFromDB = user.password;
      if (bcrypt.compareSync(oldPassword, userPasswordFromDB)) {
        const newPasswordHash = bcrypt.hashSync(newPassword, 10);
        const result = await userService.updateUserPassword(id, newPasswordHash);
        if (result) {
          ctx.response.status = 200;
          ctx.body = {
            message: 'changePassword',
          };
        }
      } else {
        ctx.response.status = 400;
        ctx.body = {
          message: 'changePassword error, wrong old password',
        };
      }
    } else {
      ctx.response.status = 400;
      ctx.body = {
        message: 'changePassword error, no this user',
      };
    }
  } else {
    ctx.response.status = 400;
    ctx.body = {
      message: 'changePassword error, no id',
    };
  }
};

export const getAllUser = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const userList = await userService.getAllUser();

  let result: any[] = [];
  if (userList) {
    result = userList;
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'get all user',
    users: result,
  };
};

export const getUserById = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const id = parseInt(ctx.params.id, 10);
  const user = await userService.getUserById(id);

  let result = {};
  if (user) {
    result = user;
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'get user',
    user: result,
  };
};
