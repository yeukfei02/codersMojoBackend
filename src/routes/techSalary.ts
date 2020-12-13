import Router from 'koa-router';

const router = new Router();

import { createTechSalaryFunc, getTechSalaryFunc } from '../controller/techSalary';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/tech-salary', isUserLoggedIn, createTechSalaryFunc);
router.get('/api/tech-salary', isUserLoggedIn, getTechSalaryFunc);

export default router;
