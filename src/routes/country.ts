import * as Router from 'koa-router';

const router = new Router();

import * as countryController from '../controller/country';

router.get('/api/country', countryController.getCountry);

export default router;
