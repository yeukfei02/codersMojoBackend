import * as cron from 'node-cron';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import axios from 'axios';
import * as _ from 'lodash';

import * as hackathonsService from '../service/hackathons';
import * as jobsService from '../service/jobs';

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

const fetchJobsDataFromGithubJobs = async () => {
  const keywordList = [
    'javascript',
    'typescript',
    'react',
    'react native',
    'node',
    'python',
    'java',
    'ios',
    'android',
    'data science',
    'machine learning',
    'frontend',
    'backend',
    'front end',
    'back end',
    'full stack',
    'mobile',
    'developer',
    'software developer',
    'software engineer',
    'senior software developer',
    'senior software engineer',
  ];

  if (keywordList) {
    keywordList.forEach(async (keywords: string, i: number) => {
      const response = await axios.get(`https://jobs.github.com/positions.json`, {
        params: {
          description: keywords,
        },
      });
      if (response) {
        const responseData = response.data;
        if (responseData) {
          const regex = /(<([^>]+)>)/gi;

          responseData.forEach(async (item: any, i: number) => {
            const type = item.type;
            const company = item.company;
            const companyUrl = item.company_url;
            const department = '';
            const location = item.location;
            const title = item.title;

            const formattedDescription = item.description.replace(regex, '');
            const description = formattedDescription;

            const url = item.url;

            const existingJobs = await jobsService.getJobsByCompanyAndTitle(company, title);
            if (_.isEmpty(existingJobs)) {
              await jobsService.createJobs(type, company, companyUrl, department, location, title, description, url);
            }
          });
        }
      }
    });
  }
};

const scheduleFetchHackathons = (scheduleTime: string) => {
  cron.schedule(scheduleTime, () => {
    console.log('### cron scheduleFetchHackathons ###');

    fetchHackathonsDataFromGoogleSheet();
  });
};

const scheduleFetchJobs = (scheduleTime: string) => {
  cron.schedule(scheduleTime, () => {
    console.log('### cron scheduleFetchJobs ###');

    fetchJobsDataFromGithubJobs();
  });
};

export const init = (): void => {
  // fetch hackathons data from google sheet every 1 hour
  scheduleFetchHackathons('0 * * * *');

  // fetch jobs data from github jobs every 1 hour
  scheduleFetchJobs('0 * * * *');
};

export default cron;
