import Koa from 'koa';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

import {
  getUserByEmail,
  createUser,
  updateUserPassword,
  changeUesrCredentials,
  getAllUser,
  getUserById,
} from '../service/user';
import { sendForgotPasswordEmail } from '../common/common';

export const signup = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const firstName = ctx.request.body.firstName;
  const lastName = ctx.request.body.lastName;
  const phone = ctx.request.body.phone;
  const email = ctx.request.body.email;
  const password = bcrypt.hashSync(ctx.request.body.password, 10);

  if (email && password) {
    const record = await getUserByEmail(email);
    if (!record) {
      await createUser(firstName, lastName, phone, email, password);

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
    const user = await getUserByEmail(email);
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
          firstName: user.first_name,
          lastName: user.last_name,
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
    const user = await getUserByEmail(email);
    if (user) {
      const id = user.users_id;
      const newPassword = crypto.randomBytes(20).toString('hex');
      const newPasswordHash = bcrypt.hashSync(newPassword, 10);

      sendForgotPasswordEmail(email, newPassword);

      const result = await updateUserPassword(id, newPasswordHash);
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
    const user = await getUserById(id);
    if (user) {
      const userPasswordFromDB = user.password;
      if (bcrypt.compareSync(oldPassword, userPasswordFromDB)) {
        const newPasswordHash = bcrypt.hashSync(newPassword, 10);
        const result = await updateUserPassword(id, newPasswordHash);
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

export const changeUesrCredentialsFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const id = parseInt(ctx.params.id, 10);
  const firstName = ctx.request.body.firstName;
  const lastName = ctx.request.body.lastName;

  if (id) {
    const user = await getUserById(id);
    if (user) {
      const result = await changeUesrCredentials(id, firstName, lastName);
      if (result) {
        ctx.response.status = 200;
        ctx.body = {
          message: 'changeUesrCredentials',
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

export const getAllUserFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const userList = await getAllUser();

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

export const getUserByIdFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const id = parseInt(ctx.params.id, 10);
  const user = await getUserById(id);

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
