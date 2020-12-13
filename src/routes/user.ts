import Router from 'koa-router';

const router = new Router();

import {
  signup,
  login,
  forgotPassword,
  changeUesrCredentialsFunc,
  changePassword,
  getAllUserFunc,
  getUserByIdFunc,
} from '../controller/user';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/user/signup', signup);
router.post('/api/user/login', login);
router.post('/api/user/forgot-password', forgotPassword);
router.put('/api/user/change-user-credentials/:id', isUserLoggedIn, changeUesrCredentialsFunc);
router.put('/api/user/change-password/:id', isUserLoggedIn, changePassword);
router.get('/api/user', getAllUserFunc);
router.get('/api/user/:id', getUserByIdFunc);

export default router;
