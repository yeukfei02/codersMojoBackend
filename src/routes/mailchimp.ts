import Router from 'koa-router';

const router = new Router();

import { addContactToAudience, checkContactSubscriptionStatus, unsubscripeContact } from '../controller/mailchimp';

router.post('/api/mailchimp/add-contact-to-audience', addContactToAudience);
router.get('/api/mailchimp/check-contact-subscription-status', checkContactSubscriptionStatus);
router.post('/api/mailchimp/unsubscribe-contact', unsubscripeContact);

export default router;
