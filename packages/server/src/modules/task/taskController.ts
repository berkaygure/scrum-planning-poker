import { Request, Response } from 'express';
import { addTask, deleteTask, findTasks } from './taskService';

const createTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const room = await addTask(name, id);
  return res.json(room);
};

const removeTask = async (req: Request, res: Response) => {
  const { id, taskId } = req.params;
  const room = await deleteTask(taskId, id);
  return res.json(room);
};

const getTasks = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tasks = await findTasks(id);
  return res.json(tasks);
};

export { createTask, removeTask, getTasks };
