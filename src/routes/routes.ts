import * as combineRouters from 'koa-combine-routers';

import mainRoutes from '../routes/main';
import userRoutes from '../routes/user';
import techBlogRoutes from '../routes/techBlog';
import mailchimpRoutes from '../routes/mailchimp';

const router = combineRouters(mainRoutes, userRoutes, techBlogRoutes, mailchimpRoutes);

export default router;
