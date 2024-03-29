import Koa from 'koa';
import _ from 'lodash';

import { getMockInterviewQuestionByType, getMockInterviewQuestionById } from '../service/mockInterviewQuestion';
import { createPastInterview, getPastInterview, getPastInterviewByUsersId } from '../service/pastInterview';

export const createPastInterviewFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const fullDateTime = ctx.request.body.fullDateTime;
  const dateTime = ctx.request.body.dateTime;
  const type = ctx.request.body.type;
  const pastInterviewStatus = ctx.request.body.pastInterviewStatus;
  const users_id = parseInt(ctx.request.body.users_id, 10);

  if (dateTime && type && pastInterviewStatus && users_id) {
    const mockInterviewQuestionList = await getMockInterviewQuestionByType(type);

    let mockInterviewQuestionId = null;
    if (mockInterviewQuestionList) {
      const randomMockInterviewQuestion = _.sample(mockInterviewQuestionList);
      mockInterviewQuestionId = randomMockInterviewQuestion.mock_interview_question_id;
      await createPastInterview(fullDateTime, dateTime, type, pastInterviewStatus, mockInterviewQuestionId, users_id);
    }

    ctx.response.status = 201;
    ctx.body = {
      message: 'createPastInterview',
      mockInterviewQuestionId: mockInterviewQuestionId,
    };
  }
};

export const getPastInterviewFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const users_id = parseInt(ctx.query.users_id, 10);

  let pastInterviewList = [];
  if (!users_id) {
    pastInterviewList = await getPastInterview();
  } else {
    pastInterviewList = await getPastInterviewByUsersId(users_id);
  }

  let result = [];
  if (pastInterviewList) {
    const mockInterviewQuestionList: any[] = [];
    for (let i = 0; i < pastInterviewList.length; i++) {
      const item = pastInterviewList[i];
      const mockInterviewQuestion = await getMockInterviewQuestionById(item.mock_interview_question_id);
      mockInterviewQuestionList.push(mockInterviewQuestion);
    }

    if (mockInterviewQuestionList) {
      result = pastInterviewList.map((item: any, i: number) => {
        const mockInterviewQuestion = mockInterviewQuestionList[i];
        item.mock_interview_question = mockInterviewQuestion;
        return item;
      });
    }
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getPastInterview',
    result: result,
  };
};
