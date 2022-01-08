import axios, { AxiosResponse } from 'axios';
import { URL_ROOMS } from '@scrum-game/common';

export const addTask = (room: string, name: string): Promise<AxiosResponse<Task[]>> =>
  axios.post<Task[]>(`${URL_ROOMS}/${room}/tasks`, { name });
