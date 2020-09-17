import * as Router from 'koa-router';

const router = new Router();

import * as firebaseController from '../controller/firebase';

router.post('/api/firebase/add-token-to-firebase-details', firebaseController.addTokenToFirebaseDetails);
router.post('/api/firebase/subscribe-topic', firebaseController.subscribeTopic);
router.post('/api/firebase/unsubscribe-topic', firebaseController.unsubscribeTopic);

export default router;
