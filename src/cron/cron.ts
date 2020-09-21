import * as cron from 'node-cron';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import * as _ from 'lodash';

import * as hackathonsService from '../service/hackathons';

const fetchHackathonsDataFromGoogleSheet = async () => {
  const doc = new GoogleSpreadsheet('13869Q8PPsqLkfVCuQkgu091E0NPf0zlpY4ZU-CIZJms');
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  if (rows) {
    rows.forEach(async (item: any, i: number) => {
      const rowData = item._rawData;
      const name = rowData[0];
      const mode = rowData[1];
      const prize = rowData[2];
      const details = rowData[4];
      const dateTime = rowData[3];
      const link = rowData[5];

      const existingHackathons = await hackathonsService.getHackathonsByName(name);
      if (_.isEmpty(existingHackathons))
        await hackathonsService.createHackathons(name, mode, prize, details, dateTime, link);
    });
  }
};

const scheduleJob = (scheduleTime: string) => {
  cron.schedule(scheduleTime, () => {
    console.log('### cron fetchHackathonsDataFromGoogleSheet ###');

    fetchHackathonsDataFromGoogleSheet();
  });
};

export const init = (): void => {
  // fetch hackathons data from google sheet every 3 hours
  scheduleJob('0 */3 * * *');
};

export default cron;
