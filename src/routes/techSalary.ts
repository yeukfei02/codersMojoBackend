import * as Router from 'koa-router';

const router = new Router();

import * as techSalaryController from '../controller/techSalary';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/tech-salary', isUserLoggedIn, techSalaryController.createTechSalary);
router.get('/api/tech-salary', isUserLoggedIn, techSalaryController.getTechSalary);

export default router;
