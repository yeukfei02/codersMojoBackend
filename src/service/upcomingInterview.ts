import { PrismaClient, upcoming_interview } from '@prisma/client';

const prisma = new PrismaClient();

export const createUpcomingInterview = async (
  fullDateTime: string,
  datetime: string,
  type: string,
  upcomingInterviewStatus: string,
  mock_interview_question_id: number,
  users_id: number,
): Promise<void> => {
  await prisma.upcoming_interview.create({
    data: {
      full_date_time: fullDateTime ? fullDateTime : '',
      date_time: datetime ? datetime : '',
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
  const upcomingInterviewList = await prisma.upcoming_interview.findMany({
    orderBy: {
      full_date_time: 'desc',
    },
  });
  return upcomingInterviewList;
};

export const getUpcomingInterviewByUsersId = async (users_id: number): Promise<upcoming_interview[]> => {
  const upcomingInterviewList = await prisma.upcoming_interview.findMany({
    where: {
      users_id: users_id,
    },
    orderBy: {
      full_date_time: 'desc',
    },
  });
  return upcomingInterviewList;
};

export const cancelUpcomingInterview = async (
  upcomingInterviewId: number,
  upcomingInterviewStatus: string,
): Promise<upcoming_interview> => {
  const result = await prisma.upcoming_interview.update({
    data: {
      status: upcomingInterviewStatus,
    },
    where: {
      upcoming_interview_id: upcomingInterviewId,
    },
  });
  return result;
};

export const rescheduleUpcomingInterview = async (
  upcomingInterviewId: number,
  fullDateTime: string,
  dateTime: string,
): Promise<upcoming_interview> => {
  const result = await prisma.upcoming_interview.update({
    data: {
      full_date_time: fullDateTime,
      date_time: dateTime,
    },
    where: {
      upcoming_interview_id: upcomingInterviewId,
    },
  });
  return result;
};
