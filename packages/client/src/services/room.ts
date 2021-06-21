import axios from 'axios'
import { URL_ROOMS } from '../config/url'

export const findAllRooms = () => {
  return axios.get<Room[]>(URL_ROOMS)
}
export const findRoom = (id: string) => {
    return axios.get<Room>(`${URL_ROOMS}/${id}`)
  }
  

export const createRoom = (name: string) => {
    return axios.post<Room>(URL_ROOMS, { name })
}

export const joinRoom = (roomId: string) => {
    return axios.post<Room>(`${URL_ROOMS}/${roomId}/join`)
}

export const leaveRoom = (roomId: string) => {
    return axios.delete<Room>(`${URL_ROOMS}/${roomId}/leave`)
}


export const deleteRoom = (roomId: string) => {
    return axios.delete(`${URL_ROOMS}/${roomId}`)
}