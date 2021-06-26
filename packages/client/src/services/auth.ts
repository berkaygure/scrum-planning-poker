import axios from 'axios';
import { URL_GET_USER_BY_ID, URL_LOGIN, URL_REGISTER } from '@scrum-game/common';

export const login = (name: string, pwd: string) => {
  return axios.post<User>(URL_LOGIN, { name, pwd });
};

export const register = (name: string, pwd: string) => {
  return axios.post<User>(URL_REGISTER, { name, pwd });
};

export const getUserById = (id: string) => {
  return axios.get<User>(`${URL_GET_USER_BY_ID}/${id}`);
};
