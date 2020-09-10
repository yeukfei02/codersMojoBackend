import * as Router from 'koa-router';

const router = new Router();

import * as mailchimpController from '../controller/mailchimp';

router.post('/api/mailchimp/add-contact-to-audience', mailchimpController.addContactToAudience);
router.get('/api/mailchimp/check-contact-subscription-status', mailchimpController.checkContactSubscriptionStatus);
router.post('/api/mailchimp/unsubscribe-contact', mailchimpController.unsubscripeContact);

export default router;
