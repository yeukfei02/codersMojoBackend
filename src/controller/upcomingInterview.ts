import * as Koa from 'koa';
import * as _ from 'lodash';

import * as mockInterviewQuestionService from '../service/mockInterviewQuestion';
import * as upcomingInterviewService from '../service/upcomingInterview';

export const createUpcomingInterview = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const dateTime = ctx.request.body.dateTime;
  const type = ctx.request.body.type;
  const status = ctx.request.body.status;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (dateTime && type && status && users_id) {
    const mockInterviewQuestionList = await mockInterviewQuestionService.getMockInterviewQuestionByType(type);
    if (mockInterviewQuestionList) {
      const randomMockInterviewQuestion = _.sample(mockInterviewQuestionList);
      const mockInterviewQuestionId = randomMockInterviewQuestion.mock_interview_question_id;
      await upcomingInterviewService.createUpcomingInterview(dateTime, type, status, mockInterviewQuestionId, users_id);
    }

    ctx.response.status = 201;
    ctx.body = {
      message: 'createUpcomingInterview',
    };
  }
};

export const getUpcomingInterview = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const users_id = parseInt(ctx.query.users_id, 10);

  let upcomingInterviewList = [];
  if (!users_id) {
    upcomingInterviewList = await upcomingInterviewService.getUpcomingInterview();
  } else {
    upcomingInterviewList = await upcomingInterviewService.getUpcomingInterviewByUsersId(users_id);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getUpcomingInterview',
    result: upcomingInterviewList,
  };
};
