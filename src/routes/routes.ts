import * as combineRouters from 'koa-combine-routers';

import mainRoutes from '../routes/main';
import userRoutes from '../routes/user';
import mailchimpRoutes from '../routes/mailchimp';

const router = combineRouters(mainRoutes, userRoutes, mailchimpRoutes);

export default router;
