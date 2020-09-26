import * as Koa from 'koa';

import * as mockInterviewQuestionService from '../service/mockInterviewQuestion';

export const createMockInterviewQuestion = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const questionTitle = ctx.request.body.questionTitle;
  const questionDescription = ctx.request.body.questionDescription;
  const type = ctx.request.body.type;

  if (questionTitle && questionDescription && type) {
    await mockInterviewQuestionService.createMockInterviewQuestion(questionTitle, questionDescription, type);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createMockInterviewQuestion',
    };
  }
};

export const getMockInterviewQuestion = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const type = ctx.query.type;

  let mockInterviewQuestionList = [];
  if (!type) {
    mockInterviewQuestionList = await mockInterviewQuestionService.getMockInterviewQuestion();
  } else {
    mockInterviewQuestionList = await mockInterviewQuestionService.getMockInterviewQuestionByType(type);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getMockInterviewQuestion',
    result: mockInterviewQuestionList,
  };
};

export const getMockInterviewQuestionById = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const id = parseInt(ctx.params.id, 10);

  if (id) {
    const mockInterviewQuestion = await mockInterviewQuestionService.getMockInterviewQuestionById(id);
    ctx.response.status = 200;
    ctx.body = {
      message: 'getMockInterviewQuestion',
      result: mockInterviewQuestion,
    };
  }
};
