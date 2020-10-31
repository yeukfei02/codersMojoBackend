import * as Koa from 'koa';
import * as _ from 'lodash';

import * as mockInterviewQuestionService from '../service/mockInterviewQuestion';
import * as upcomingInterviewService from '../service/upcomingInterview';
import * as userService from '../service/user';

export const createUpcomingInterview = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const fullDateTime = ctx.request.body.fullDateTime;
  const dateTime = ctx.request.body.dateTime;
  const type = ctx.request.body.type;
  const upcomingInterviewStatus = ctx.request.body.upcomingInterviewStatus;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (fullDateTime && dateTime && type && upcomingInterviewStatus && users_id) {
    const mockInterviewQuestionList = await mockInterviewQuestionService.getMockInterviewQuestionByType(type);

    let mockInterviewQuestionId = null;
    if (mockInterviewQuestionList) {
      const randomMockInterviewQuestion = _.sample(mockInterviewQuestionList);
      mockInterviewQuestionId = randomMockInterviewQuestion.mock_interview_question_id;
      await upcomingInterviewService.createUpcomingInterview(
        fullDateTime,
        dateTime,
        type,
        upcomingInterviewStatus,
        mockInterviewQuestionId,
        users_id,
      );
    }

    let matchPeerName = '';
    const upcomingInterviewList = await upcomingInterviewService.getUpcomingInterviewByFilter(
      fullDateTime,
      type,
      users_id,
    );
    if (upcomingInterviewList) {
      const upcomingInterview = _.sample(upcomingInterviewList);
      if (upcomingInterview) {
        const user = await userService.getUserById(upcomingInterview.users_id);
        matchPeerName = `${user.first_name} ${user.last_name}`;
      }
    }

    ctx.response.status = 201;
    ctx.body = {
      message: 'createUpcomingInterview',
      mockInterviewQuestionId: mockInterviewQuestionId,
      matchPeerName: matchPeerName,
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

export const cancelUpcomingInterview = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const upcomingInterviewId = parseInt(ctx.params.upcomingInterviewId, 10);
  const upcomingInterviewStatus = ctx.request.body.upcomingInterviewStatus;

  if (upcomingInterviewId) {
    const result = await upcomingInterviewService.cancelUpcomingInterview(upcomingInterviewId, upcomingInterviewStatus);
    ctx.response.status = 200;
    ctx.body = {
      message: 'cancelUpcomingInterview',
      result: result,
    };
  }
};

export const rescheduleUpcomingInterview = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const upcomingInterviewId = parseInt(ctx.params.upcomingInterviewId, 10);
  const fullDateTime = ctx.request.body.fullDateTime;
  const dateTime = ctx.request.body.dateTime;

  if (upcomingInterviewId) {
    const result = await upcomingInterviewService.rescheduleUpcomingInterview(
      upcomingInterviewId,
      fullDateTime,
      dateTime,
    );
    ctx.response.status = 200;
    ctx.body = {
      message: 'rescheduleUpcomingInterview',
      result: result,
    };
  }
};
