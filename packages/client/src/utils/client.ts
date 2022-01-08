import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const apiURL = process.env.REACT_APP_SERVER_URL;

interface ClientConfig extends AxiosRequestConfig {
  token?: string;
}

const axiosClient = axios.create({
  baseURL: apiURL,
});

async function client<T>(endpoint: string, cfg: ClientConfig = {}): Promise<T> {
  const { data, ...customConfig } = cfg;

  const config: AxiosRequestConfig = {
    data,
    url: endpoint,
    withCredentials: true,
    ...customConfig,
  };

  return axiosClient(config).then((response) => {
    const data = response.data;

    return data;
  });
}

client.instance = axiosClient;

export { client };
