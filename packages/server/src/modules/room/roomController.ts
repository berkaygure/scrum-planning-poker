import { NextFunction, Request, Response } from 'express';
import { findAll, createRoom, deleteRoom, joinRoom, leaveRoom, findRoomById } from './roomService';

async function all(request: Request, res: Response, next: NextFunction) {
  try {
    const query = (request.query.q as string) || '';
    const onlyJoined = request.query.onlyJoined === 'true';
    const rooms = await findAll(query, onlyJoined, (request.user as any)._id);
    res.json(rooms);
  } catch (err) {
    next(err);
  }
}

async function one(request: Request, res: Response, next: NextFunction) {
  try {
    const { id } = request.params;
    const room = await findRoomById(id);
    res.json(room);
  } catch (err) {
    next(err);
  }
}

async function create(request: Request, res: Response, next: NextFunction) {
  try {
    const { name } = request.body;
    const room = await createRoom(name, request.user as any);
    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
}

async function removeRoom(request: Request, res: Response, next: NextFunction) {
  try {
    const { id } = request.params;
    await deleteRoom(id, (request.user as any)._id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function join(request: Request, res: Response, next: NextFunction) {
  try {
    joinRoom(request.params.id, request.user as any);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
}

async function leave(request: Request, res: Response, next: NextFunction) {
  try {
    leaveRoom(request.params.id, request.user as any);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export { all, create, removeRoom, join, leave, one };
