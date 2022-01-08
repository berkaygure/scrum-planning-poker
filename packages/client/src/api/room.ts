import axios, { AxiosResponse } from 'axios';
import { URL_ROOMS } from '@scrum-game/common';
import { client } from 'utils/client';

export const findAllRooms = () => client<Room[]>(`${URL_ROOMS}`);

export const findRoom = (id: string): Promise<AxiosResponse<Room>> =>
  axios.get<Room>(`${URL_ROOMS}/${id}`);

export const createRoom = (name: string): Promise<AxiosResponse<Room>> =>
  axios.post<Room>(URL_ROOMS, { name });

export const joinRoom = (roomId: string): Promise<AxiosResponse<Room>> =>
  axios.post<Room>(`${URL_ROOMS}/${roomId}/join`);

export const leaveRoom = (roomId: string): Promise<AxiosResponse<Room>> =>
  axios.delete<Room>(`${URL_ROOMS}/${roomId}/leave`);

export const deleteRoom = (roomId: string): Promise<AxiosResponse<Room>> =>
  axios.delete(`${URL_ROOMS}/${roomId}`);

export const addTask = (roomId: string, taskName: string): Promise<AxiosResponse<Task[]>> =>
  axios.post<Task[]>(`${URL_ROOMS}/${roomId}/tasks`, { name: taskName });
