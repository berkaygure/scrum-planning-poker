import { ObjectId } from 'mongoose';
import { AppError } from '../../exceptions/AppError';
import { User } from '../auth/user';
import Room from './room';

async function findAll(query?: string, onlyJoined?: boolean, userId?: ObjectId) {
  const roomsQuery = {
    name: { $regex: query, $options: 'i' },
  };

  const filter = {
    ...(query ? roomsQuery : {}),
    ...(onlyJoined ? { players: { $in: [userId] } } : {}),
  };

  return Room.find()
    .populate('players')
    .populate('tasks')
    .populate('owner')
    .where(filter)
    .sort('-createdAt');
}

async function createRoom(name: string, user: User) {
  if (!user) {
    throw new AppError('Unauthorized', 401, '', false);
  }
  const room = await Room.create({ name, owner: user._id });
  room.players.push(user);
  await room.save();

  return room;
}

async function deleteRoom(id: string, userId: ObjectId) {
  const room = await Room.findById(id);

  if (room.owner.toString() !== userId.toString()) {
    throw new AppError('Unauthorized', 401, '', false);
  }
  await room.deleteOne();
  return room;
}

async function joinRoom(id: string, user: User) {
  const room = await Room.findById(id);
  room.players.push(user);
  await room.save();
  return room;
}

async function leaveRoom(id: string, user: User) {
  const room = await Room.findById(id);
  room.players = room.players.filter((player) => player.toString() !== user._id.toString());
  await room.save();
  return room;
}

async function findRoomById(id: string) {
  return Room.findById(id).populate('players').populate('tasks').populate('owner');
}

export { findAll, createRoom, deleteRoom, joinRoom, leaveRoom, findRoomById };
