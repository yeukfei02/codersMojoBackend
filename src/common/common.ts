import * as mailgun from 'mailgun-js';
import * as fs from 'fs';
import * as path from 'path';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

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
                    <img src="${logoBase64Str}" width="200" height="65" alt="" />
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

export const uploadFileToS3 = async (filePath: any, fileName: string): Promise<string> => {
  const fileContent = fs.readFileSync(filePath);

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-1',
  });

  const BUCKET_NAME = 'codersmojo';

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${uuidv4()}-${fileName}`,
    Body: fileContent,
  };

  const s3UploadResult: any = new Promise((resolve, reject) => {
    s3.upload(params, (error: any, data: any) => {
      if (!error) {
        if (data) {
          resolve(data.Location);
        }
      } else {
        reject('error = ' + error);
      }
    });
  });

  const imageUrl = await s3UploadResult;
  return imageUrl;
};
