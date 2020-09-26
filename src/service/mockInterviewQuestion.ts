import { PrismaClient, mock_interview_question } from '@prisma/client';

const prisma = new PrismaClient();

export const createMockInterviewQuestion = async (
  questionTitle: string,
  questionDescription: string,
  type: string,
): Promise<void> => {
  await prisma.mock_interview_question.create({
    data: {
      question_title: questionTitle ? questionTitle : '',
      question_description: questionDescription ? questionDescription : '',
      type: type ? type : '',
    },
  });
};

export const getMockInterviewQuestion = async (): Promise<mock_interview_question[]> => {
  const mockInterviewQuestionList = await prisma.mock_interview_question.findMany({});
  return mockInterviewQuestionList;
};

export const getMockInterviewQuestionByType = async (type: string): Promise<mock_interview_question[]> => {
  const mockInterviewQuestionList = await prisma.mock_interview_question.findMany({
    where: {
      type: type,
    },
  });
  return mockInterviewQuestionList;
};
