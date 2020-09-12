import * as mailgun from 'mailgun-js';

const getMailgun = () => {
  const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
  const DOMAIN = 'sandboxae2edae4c5f04857a60f1620256b4c4f.mailgun.org';
  const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });
  return mg;
};

export const sendForgotPasswordEmail = async (email: string, newPassword: string): Promise<void> => {
  const mg = getMailgun();

  try {
    const data = {
      from: 'CodersMojo <codersmojo@sandboxae2edae4c5f04857a60f1620256b4c4f.mailgun.org>',
      to: email,
      subject: 'CodersMojo Forgot Password',
      text: `This is your new password: ${newPassword}`,
    };
    const result = await mg.messages().send(data);
    console.log('sendForgotPasswordEmail result = ', result);
  } catch (e) {
    console.log('sendForgotPasswordEmail error = ', e.message);
  }
};
