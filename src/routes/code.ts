import Router from 'koa-router';

const router = new Router();

import { runCode } from '../controller/code';

router.post('/api/code/run', runCode);

export default router;
