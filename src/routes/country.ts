import Router from 'koa-router';

const router = new Router();

import { getCountryFunc } from '../controller/country';

router.get('/api/country', getCountryFunc);

export default router;
