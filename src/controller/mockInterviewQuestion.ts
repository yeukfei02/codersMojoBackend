import Koa from 'koa';

import {
  createMockInterviewQuestion,
  getMockInterviewQuestion,
  getMockInterviewQuestionByType,
  getMockInterviewQuestionById,
} from '../service/mockInterviewQuestion';

export const createMockInterviewQuestionFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const questionTitle = ctx.request.body.questionTitle;
  const questionDescription = ctx.request.body.questionDescription;
  const type = ctx.request.body.type;

  if (questionTitle && questionDescription && type) {
    await createMockInterviewQuestion(questionTitle, questionDescription, type);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createMockInterviewQuestion',
    };
  }
};

export const getMockInterviewQuestionFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const type = ctx.query.type;

  let mockInterviewQuestionList = [];
  if (!type) {
    mockInterviewQuestionList = await getMockInterviewQuestion();
  } else {
    mockInterviewQuestionList = await getMockInterviewQuestionByType(type);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getMockInterviewQuestion',
    result: mockInterviewQuestionList,
  };
};

export const getMockInterviewQuestionByIdFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const id = parseInt(ctx.params.id, 10);

  if (id) {
    const mockInterviewQuestion = await getMockInterviewQuestionById(id);
    ctx.response.status = 200;
    ctx.body = {
      message: 'getMockInterviewQuestion',
      result: mockInterviewQuestion,
    };
  }
};
