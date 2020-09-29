import * as Router from 'koa-router';

const router = new Router();

import * as codeController from '../controller/code';

router.post('/api/code/run', codeController.runCode);

export default router;
