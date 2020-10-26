import { PrismaClient, past_interview } from '@prisma/client';
import * as moment from 'moment';
import * as _ from 'lodash';

const prisma = new PrismaClient();

export const createPastInterview = async (
  fullDateTime: string,
  datetime: string,
  type: string,
  pastInterviewStatus: string,
  mock_interview_question_id: number,
  users_id: number,
): Promise<void> => {
  await prisma.past_interview.create({
    data: {
      full_date_time: fullDateTime ? fullDateTime : '',
      date_time: datetime ? datetime : '',
      type: type ? type : '',
      status: pastInterviewStatus ? pastInterviewStatus : '',
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

export const getPastInterview = async (): Promise<past_interview[]> => {
  const pastInterviewList = await prisma.past_interview.findMany({
    orderBy: {
      full_date_time: 'desc',
    },
  });
  const formattedPastInterviewList = pastInterviewList.map((item: any, i: number) => {
    item.full_date_time = moment(item.full_date_time).format('YYYY-MM-DD');
    return item;
  });
  const orderedPastInterviewList = _.orderBy(formattedPastInterviewList, 'full_date_time', 'desc');

  return orderedPastInterviewList;
};

export const getPastInterviewByUsersId = async (users_id: number): Promise<past_interview[]> => {
  const pastInterviewList = await prisma.past_interview.findMany({
    where: {
      users_id: users_id,
    },
    orderBy: {
      full_date_time: 'desc',
    },
  });
  const formattedPastInterviewList = pastInterviewList.map((item: any, i: number) => {
    item.full_date_time = moment(item.full_date_time).format('YYYY-MM-DD');
    return item;
  });
  const orderedPastInterviewList = _.orderBy(formattedPastInterviewList, 'full_date_time', 'desc');

  return orderedPastInterviewList;
};
