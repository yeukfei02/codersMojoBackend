import * as mailgun from 'mailgun-js';
import * as fs from 'fs';
import * as path from 'path';

const getMailgun = () => {
  const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
  const DOMAIN = 'sandboxae2edae4c5f04857a60f1620256b4c4f.mailgun.org';
  const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });
  return mg;
};

const getLogoBase64Str = () => {
  const filePath = path.join(__dirname, '../images/logo.png');
  const logoBase64Str = fs.readFileSync(filePath, 'base64');

  const result = `data:image/png;base64,${logoBase64Str}`;
  return result;
};

export const sendForgotPasswordEmail = async (email: string, newPassword: string): Promise<void> => {
  const mg = getMailgun();

  const logoBase64Str = getLogoBase64Str();

  const html = `
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
          <td align="center">
              <div style="background: lightgray; padding: 3em">
                  <div style="background: white; padding: 3em; border-radius: 0.5em">
                    <img src="${logoBase64Str}" width="180" height="180" alt="" />
                    <h2 style="margin-top: 1em; color: black;">
                      <b>Coders Mojo</b>
                    </h2>
                    <div style="margin-top: 3em; color: black;">
                      This is your new password:
                    </div>
                    <div style="margin-top: 1em; color: black;">
                      <b>${newPassword}</b>
                    </div>
                  </div>
              </div>
          </td>
      </tr>
    </table>
  `;

  try {
    const data = {
      from: 'CodersMojo <codersmojo@sandboxae2edae4c5f04857a60f1620256b4c4f.mailgun.org>',
      to: email,
      subject: 'CodersMojo Forgot Password',
      // text: `This is your new password: ${newPassword}`,
      html: html,
    };
    const result = await mg.messages().send(data);
    console.log('sendForgotPasswordEmail result = ', result);
  } catch (e) {
    console.log('sendForgotPasswordEmail error = ', e.message);
  }
};
