import * as Koa from 'koa';
import * as _ from 'lodash';

import * as mockInterviewQuestionService from '../service/mockInterviewQuestion';
import * as upcomingInterviewService from '../service/upcomingInterview';

export const createUpcomingInterview = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const dateTime = ctx.request.body.dateTime;
  const type = ctx.request.body.type;
  const upcomingInterviewStatus = ctx.request.body.upcomingInterviewStatus;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (dateTime && type && upcomingInterviewStatus && users_id) {
    const mockInterviewQuestionList = await mockInterviewQuestionService.getMockInterviewQuestionByType(type);

    let mockInterviewQuestionId = null;
    if (mockInterviewQuestionList) {
      const randomMockInterviewQuestion = _.sample(mockInterviewQuestionList);
      mockInterviewQuestionId = randomMockInterviewQuestion.mock_interview_question_id;
      await upcomingInterviewService.createUpcomingInterview(
        dateTime,
        type,
        upcomingInterviewStatus,
        mockInterviewQuestionId,
        users_id,
      );
    }

    ctx.response.status = 201;
    ctx.body = {
      message: 'createUpcomingInterview',
      mockInterviewQuestionId: mockInterviewQuestionId,
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

  let result = [];
  if (upcomingInterviewList) {
    const mockInterviewQuestionList: any[] = [];
    for (let i = 0; i < upcomingInterviewList.length; i++) {
      const item = upcomingInterviewList[i];
      const mockInterviewQuestion = await mockInterviewQuestionService.getMockInterviewQuestionById(
        item.mock_interview_question_id,
      );
      mockInterviewQuestionList.push(mockInterviewQuestion);
    }

    if (mockInterviewQuestionList) {
      result = upcomingInterviewList.map((item: any, i: number) => {
        const mockInterviewQuestion = mockInterviewQuestionList[i];
        item.mock_interview_question = mockInterviewQuestion;
        return item;
      });
    }
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getUpcomingInterview',
    result: result,
  };
};
