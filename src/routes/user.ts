import * as Router from 'koa-router';

const router = new Router();

import * as userController from '../controller/user';

router.post('/api/user/signup', userController.signup);
router.post('/api/user/login', userController.login);
router.post('/api/user/forgot-password', userController.forgotPassword);
router.put('/api/user/change-password/:id', userController.changePassword);
router.get('/api/user', userController.getAllUser);
router.get('/api/user/:id', userController.getUserById);

export default router;
