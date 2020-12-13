import Router from 'koa-router';

const router = new Router();

import {
  createMockInterviewQuestionFunc,
  getMockInterviewQuestionFunc,
  getMockInterviewQuestionByIdFunc,
} from '../controller/mockInterviewQuestion';

import { isUserLoggedIn } from '../middleware/middleware';

router.post('/api/mock-interview-question', createMockInterviewQuestionFunc);
router.get('/api/mock-interview-question', isUserLoggedIn, getMockInterviewQuestionFunc);
router.get('/api/mock-interview-question/:id', isUserLoggedIn, getMockInterviewQuestionByIdFunc);

export default router;
