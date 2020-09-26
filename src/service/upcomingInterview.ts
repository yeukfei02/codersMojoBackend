import { PrismaClient, upcoming_interview } from '@prisma/client';

const prisma = new PrismaClient();

export const createUpcomingInterview = async (
  datetime: string,
  type: string,
  upcomingInterviewStatus: string,
  mock_interview_question_id: number,
  users_id: number,
): Promise<void> => {
  await prisma.upcoming_interview.create({
    data: {
      datetime: datetime ? datetime : '',
      type: type ? type : '',
      status: upcomingInterviewStatus ? upcomingInterviewStatus : '',
      mock_interview_question: {
        connect: {
          mock_interview_question_id: mock_interview_question_id,
        },
      },
      users: {
        connect: {
          users_id: users_id,
        },
      },
    },
  });
};

export const getUpcomingInterview = async (): Promise<upcoming_interview[]> => {
  const upcomingInterviewList = await prisma.upcoming_interview.findMany({});
  return upcomingInterviewList;
};

export const getUpcomingInterviewByUsersId = async (users_id: number): Promise<upcoming_interview[]> => {
  const upcomingInterviewList = await prisma.upcoming_interview.findMany({
    where: {
      users_id: users_id,
    },
  });
  return upcomingInterviewList;
};
