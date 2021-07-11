import axios from 'axios';
import { URL_GET_USER_BY_ID, URL_LOGIN, URL_REGISTER } from '@scrum-game/common';

export const login = (username: string, password: string) =>
  axios.post<User>(URL_LOGIN, { username, password });

export const register = (username: string, password: string) =>
  axios.post<User>(URL_REGISTER, { username, password });

export const getUserById = (id: string) => axios.get<User>(`${URL_GET_USER_BY_ID}/${id}`);
