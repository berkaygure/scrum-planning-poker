import { findRoomById } from '../room/roomService';

const addTask = async (taskName: string, roomId: string) => {
  const room = await findRoomById(roomId);
  room.tasks.push({
    name: taskName,
  });
  await room.save();
  return room.tasks;
};

const deleteTask = async (taskId: string, roomId: string) => {
  const room = await findRoomById(roomId);
  room.tasks = room.tasks.filter((task) => task.toString() !== taskId);
  await room.save();
  return room.tasks;
};

const findTasks = async (roomId: string) => {
  const room = await findRoomById(roomId);
  return room.tasks;
};

export { addTask, deleteTask, findTasks };
