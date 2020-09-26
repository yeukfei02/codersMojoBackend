import * as Router from 'koa-router';

const router = new Router();

import * as mockInterviewQuestionController from '../controller/mockInterviewQuestion';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/mock-interview-question', mockInterviewQuestionController.createMockInterviewQuestion);
router.get('/api/mock-interview-question', isUserLoggedIn, mockInterviewQuestionController.getMockInterviewQuestion);

export default router;
