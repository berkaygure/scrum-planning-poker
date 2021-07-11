import axios from 'axios';
import { URL_ROOMS } from '@scrum-game/common';

export const findAllRooms = () => axios.get<Room[]>(URL_ROOMS);
export const findRoom = (id: string) => axios.get<Room>(`${URL_ROOMS}/${id}`);

export const createRoom = (name: string) => axios.post<Room>(URL_ROOMS, { name });

export const joinRoom = (roomId: string) => axios.post<Room>(`${URL_ROOMS}/${roomId}/join`);

export const leaveRoom = (roomId: string) => axios.delete<Room>(`${URL_ROOMS}/${roomId}/leave`);

export const deleteRoom = (roomId: string) => axios.delete(`${URL_ROOMS}/${roomId}`);

export const addTask = (roomId: string, taskName: string) =>
  axios.post<Task[]>(`${URL_ROOMS}/${roomId}/tasks`, { name: taskName });
