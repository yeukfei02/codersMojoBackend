import * as combineRouters from 'koa-combine-routers';

import mainRoutes from '../routes/main';
import userRoutes from '../routes/user';
import techBlogRoutes from '../routes/techBlog';
import jobsRoutes from '../routes/jobs';
import techSalaryRoutes from './techSalary';
import postsRoutes from '../routes/posts';
import commentsRoutes from '../routes/comments';
import hackathonsRoutes from '../routes/hackathons';
import inviteFriendsRoutes from '../routes/inviteFriends';
import womenInvestorCommunityRoutes from '../routes/womenInvestorCommunity';
import mockInterviewQuestionRoutes from '../routes/mockInterviewQuestion';
import upcomingInterviewRoutes from '../routes/upcomingInterview';
import pastInterviewRoutes from '../routes/pastInterview';
import codeRoutes from '../routes/code';
import countryRoutes from '../routes/country';
import mailchimpRoutes from '../routes/mailchimp';
import firebaseRoutes from '../routes/firebase';

const router = combineRouters(
  mainRoutes,
  userRoutes,
  techBlogRoutes,
  jobsRoutes,
  techSalaryRoutes,
  postsRoutes,
  commentsRoutes,
  hackathonsRoutes,
  inviteFriendsRoutes,
  womenInvestorCommunityRoutes,
  mockInterviewQuestionRoutes,
  upcomingInterviewRoutes,
  pastInterviewRoutes,
  codeRoutes,
  countryRoutes,
  mailchimpRoutes,
  firebaseRoutes,
);

export default router;
