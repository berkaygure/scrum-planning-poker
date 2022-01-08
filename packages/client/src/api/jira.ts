import axios, { AxiosResponse } from 'axios';

export const testConnection = (url: string, auth: string): Promise<AxiosResponse> =>
  axios.post(
    '/api/jira',
    {
      url: url,
    },
    {
      headers: {
        Authorization: auth,
      },
    },
  );
