/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from 'utils/client';
import { AxiosResponse } from 'axios';

const getMe = (token: string, resolve: (args: any) => void) => {
  client.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  client('/api/auth/me').then((data: any) => {
    resolve({ username: data.username, token, _id: data._id });
  });
};

export const login = (username: string, password: string): Promise<User> =>
  new Promise((resolve, reject) => {
    client('/api/auth/login', { method: 'POST', data: { username, password } })
      .then((data: any) => {
        if (!data.token) {
          return reject({});
        }
        getMe(data.token, resolve);
      })
      .catch(reject);
  });

export const register = (username: string, password: string): Promise<User> =>
  new Promise((resolve, reject) => {
    client('/api/auth/register', { method: 'POST', data: { username, password } })
      .then((data: any) => {
        if (!data.token) {
          return reject({});
        }
        getMe(data.token, resolve);
      })
      .catch(reject);
  });

export const getToken = (): Promise<User> =>
  new Promise((resolve, reject) => {
    client('/api/auth/refreshToken', { method: 'POST' })
      .then((data: any) => {
        if (!data.token) {
          return reject({});
        }
        getMe(data.token, resolve);
      })
      .catch(reject);
  });

export const logOut = (token: string): Promise<AxiosResponse<{ token: string }>> =>
  client('/api/auth/logout', { token });
