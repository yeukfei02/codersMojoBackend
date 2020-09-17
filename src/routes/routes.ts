import * as combineRouters from 'koa-combine-routers';

import mainRoutes from '../routes/main';
import userRoutes from '../routes/user';
import techBlogRoutes from '../routes/techBlog';
import jobsRoutes from '../routes/jobs';
import postsRoutes from '../routes/posts';
import countryRoutes from '../routes/country';
import mailchimpRoutes from '../routes/mailchimp';
import firebaseRoutes from '../routes/firebase';

const router = combineRouters(
  mainRoutes,
  userRoutes,
  techBlogRoutes,
  jobsRoutes,
  postsRoutes,
  countryRoutes,
  mailchimpRoutes,
  firebaseRoutes,
);

export default router;
