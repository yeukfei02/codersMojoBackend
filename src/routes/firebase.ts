import Router from 'koa-router';

const router = new Router();

import { addTokenToFirebaseDetailsFunc, subscribeTopic, unsubscribeTopic } from '../controller/firebase';

router.post('/api/firebase/add-token-to-firebase-details', addTokenToFirebaseDetailsFunc);
router.post('/api/firebase/subscribe-topic', subscribeTopic);
router.post('/api/firebase/unsubscribe-topic', unsubscribeTopic);

export default router;
