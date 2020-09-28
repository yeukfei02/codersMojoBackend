import * as combineRouters from 'koa-combine-routers';

import mainRoutes from '../routes/main';
import userRoutes from '../routes/user';
import techBlogRoutes from '../routes/techBlog';
import jobsRoutes from '../routes/jobs';
import postsRoutes from '../routes/posts';
import hackathonsRoutes from '../routes/hackathons';
import inviteFriendsRoutes from '../routes/inviteFriends';
import mockInterviewQuestionRoutes from '../routes/mockInterviewQuestion';
import upcomingInterviewRoutes from '../routes/upcomingInterview';
import pastInterviewRoutes from '../routes/pastInterview';
import countryRoutes from '../routes/country';
import mailchimpRoutes from '../routes/mailchimp';
import firebaseRoutes from '../routes/firebase';

const router = combineRouters(
  mainRoutes,
  userRoutes,
  techBlogRoutes,
  jobsRoutes,
  postsRoutes,
  hackathonsRoutes,
  inviteFriendsRoutes,
  mockInterviewQuestionRoutes,
  upcomingInterviewRoutes,
  pastInterviewRoutes,
  countryRoutes,
  mailchimpRoutes,
  firebaseRoutes,
);

export default router;
