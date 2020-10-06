import * as cron from 'node-cron';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import axios from 'axios';
import * as _ from 'lodash';

import * as hackathonsService from '../service/hackathons';
import * as jobsService from '../service/jobs';
import * as techSalaryService from '../service/techSalary';

const fetchHackathonsDataFromGoogleSheet = async () => {
  const doc = new GoogleSpreadsheet('13869Q8PPsqLkfVCuQkgu091E0NPf0zlpY4ZU-CIZJms');
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTCYM94UeoovTj\nTNkH+R3QbgXYHbrz5Va9NMNiIRBOwZYEKbrq6HOa3P/RLLALISCBtRdhrJZlBdo9\nn2MmuGXBXunTLj0mt2rateQzBjhxNVbQCw4ado6BKsmD0tjhGDeTbFvOkv5+GMta\nd3jIBErPfbJjtxGstFMnwTH06cI2cXlZ3smmZFRG0nc5DbeRXmg2RdpKgRFneUKO\nAiL+geA5erZHpLp7NX9S50RyjjI4PLBtA5UjSWeskW0iJLaMpWreoA5tCR94gotT\n0Xg7FEqClPLZsaCPWe6Ax5RBEm4kwTyM2N1OLGBvSZFmjdyiadEFXBbTomkEVpAh\nfLM69QCFAgMBAAECggEAE1mxJQCXfeKWd19zTwQ/ZzGPa5+RctrTUNbNS4QiM9zg\nRB8N1CUR5JNH1m0CJbyyqr7PsNV1MAVdweS8rK8GKLlROChQ0+n7H3UqKKhbW7xu\nUPX48K6j2aG/IU05NODv+tHAVHkTlYnxRQ9+jaiHGFUINGINRtUWz6bEgLAM1MnF\nyMWcSYH/gsfgWREH0iucSw54GGgFUEYJrSNHTVzduRiEINDvmLl4RkkXajvX+LbC\nqEq0RRW93kQbVpddDIscZWcIAmXUQQAOen/wraZgGzJRN/+gohiZJkQznkM2ciMk\nogD+IvMjgukXGxjxnn3PwytuSD+O/76zW0C60Fo6yQKBgQDw/nVf+JL2rla+InY9\nYT/EDcfRzd83qmg+iRK0c9tW5Yh+b3AeUaY0xf2zUqzeb54o6jADGK03GF8wQZBB\nSAhkwZyWnY+/b5fmaLU0lY2b8b6xmXCTnetNytD+JrInDc2e4vemLGEmeVboK7UA\nmQbPGrCtc6PTahZpTdUUqONwzwKBgQDgLYfEnFsuHyEwjanTg7GUP3tKq0jGSGIq\nNUorxDks1WA7F/ob+xiLVPpuyFLKnh+AesbEIfAotLGQhD3OI226/mqFKRSEvSh9\nTz1kWQmQSTKQFYgQzlgmPNmFJRw9HVNEA/0wn/4szafNIFR1Ra7yRAfLcJ2jhS8q\nnJwzDMAGawKBgAjrwniNARO0nG1pZSscgHnHcNApaMvsuPMnq9OWPlZXJNhZU7Mr\nnpVxhtSuiMurIhWtpZ1XuoHBmzR0GNzxx63DJQLGTl3tyZez5JFPv/A34LE+VtaA\nEAfPLDFcSVf8wNHS4Qv7tJTyBO+PPqIJCCF+gW/KShQ3ZyD6ypp7LgAtAoGAW2/W\nv8fynOZPmEk/6qj9hnU6KaOhhFbDy2l+/kkD9Rh3LsNB3aXWRgZ8OzF0K3bBbJsn\ndZpOJZxGDKcTun/S4wGgmv29g8LPwATRCpwSfYqNmB1gKVKwu6/4HQmc8gSDEOv7\nmpi3iLi9Z7p3GHo6uFAtSbp+YdMSAPRt9ZiOvk8CgYEAlq5Su9wKClAR89r5EAVK\nR15xiArAlDCxFnZZTPU6EkhIDlCxUq4QXr2nOr0Y5MwmKATGKvwmE0e12EPI9gAs\nrVWr7NWZG7eqqqcHUguwterkXCCcQRsLKd3y6aCV6q6rrH/pYR67G2w+TkkNmPKb\n8K/4huEUmr7DuauQfMCDU/w=\n-----END PRIVATE KEY-----\n'.replace(
      /\\n/g,
      '\n',
    ),
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
            const department = item.title;
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

const fetchTechSalaryDataFromLevelsFyi = async () => {
  const response = await axios.get(`https://www.levels.fyi/js/salaryData.json`);
  if (response) {
    const responseData = response.data;
    if (responseData) {
      const filteredResponseData = _.sampleSize(responseData, 2500);
      if (filteredResponseData) {
        filteredResponseData.forEach(async (item: any, i: number) => {
          const jobTitle = item.title;
          const company = item.company;
          const description = `years of experience: ${item.yearsofexperience}`;
          const totalCompensation = `${item.totalyearlycompensation}k p.a.`;
          const location = item.location;

          const existingTechSalary = await techSalaryService.getTechSalaryByJobTitleAndCompany(jobTitle, company);
          if (_.isEmpty(existingTechSalary)) {
            await techSalaryService.createTechSalary(jobTitle, company, description, totalCompensation, location);
          }
        });
      }
    }
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

const scheduleFetchTechSalary = (scheduleTime: string) => {
  cron.schedule(scheduleTime, () => {
    console.log('### cron scheduleFetchTechSalary ###');

    fetchTechSalaryDataFromLevelsFyi();
  });
};

export const init = (): void => {
  // fetch hackathons data from google sheet every 1 hour
  scheduleFetchHackathons('0 * * * *');

  // fetch jobs data from github jobs every 1 hour
  scheduleFetchJobs('0 * * * *');

  // fetch tech salary data from levels.fyi every 1 hour
  scheduleFetchTechSalary('0 * * * *');
};

export default cron;
