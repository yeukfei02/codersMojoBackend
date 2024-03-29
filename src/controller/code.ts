import Koa from 'koa';
import axios from 'axios';
// const hackerEarth = require('hackerearth-node');

export const runCode = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const source = ctx.request.body.source;
  const lang = ctx.request.body.lang;
  const response = await judge0Func(ctx, source, lang);

  ctx.response.status = 201;
  ctx.body = {
    message: 'runCode',
    result: response,
  };
};

// async function hackerEarthFunc(ctx: Koa.Context, source: string, lang: string) {
//   if (source && lang) {
//     const he = new hackerEarth(process.env.HACKEREARTH_CLIENT_SECRET_KEY, '0');
//     const config = {
//       time_limit: 5,
//       memory_limit: 262144,
//       source: source,
//       input: '',
//       language: lang,
//     };

//     const response = await he.run(config);
//     const responseJSON = JSON.parse(response);

//     ctx.response.status = 201;
//     ctx.body = {
//       message: 'runCode',
//       result: responseJSON,
//     };
//   }
// }

async function judge0Func(ctx: Koa.Context, source: string, lang: string) {
  let response = null;

  try {
    if (source && lang) {
      const languageList = await getLanguageList();

      let languageId = 0;
      if (languageList) {
        languageList.forEach((item: any, i: number) => {
          if (item.name.toLowerCase().includes(lang.toLowerCase())) {
            languageId = item.id;
          }
        });
      }

      if (languageId > 0) {
        const token = await createSubmission(source, languageId);
        if (token) {
          let getSubmissionStatus = true;
          let result = null;
          while (getSubmissionStatus) {
            result = await getSubmission(token);
            console.log('runCode result = ', result);

            if (result) {
              if (result.status.description === 'Accepted') {
                response = result;
                getSubmissionStatus = false;
              } else {
                if (result.stderr === null && !result.compile_output) {
                  result = await getSubmission(token);
                } else {
                  response = result;
                  getSubmissionStatus = false;
                }
              }
            }
          }
        }
      }
    }
  } catch (e) {
    console.log('error = ', e);
  }

  return response;
}

async function getLanguageList() {
  let result = [];

  const response = await axios.get(`https://judge0.p.rapidapi.com/languages`, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'x-rapidapi-host': 'judge0.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    },
  });
  if (response) {
    const responseData = response.data;
    if (responseData) {
      result = responseData;
    }
  }

  return result;
}

async function createSubmission(source: string, languageId: number) {
  let result = '';

  const response = await axios.post(
    `https://judge0.p.rapidapi.com/submissions`,
    {
      source_code: source,
      language_id: languageId,
      stdin: '',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'judge0.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPID_API_KEY,
      },
    },
  );
  if (response) {
    const responseData = response.data;
    if (responseData) {
      const token = responseData.token;
      if (token) {
        result = token;
      }
    }
  }

  return result;
}

async function getSubmission(token: string) {
  let result = null;

  const response = await axios.get(`https://judge0.p.rapidapi.com/submissions/${token}`, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'x-rapidapi-host': 'judge0.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    },
  });
  if (response) {
    const responseData = response.data;
    if (responseData) {
      result = responseData;
    }
  }

  return result;
}
