const RoomService = require('../service/RoomService');
const TaskService = require('../service/TaskService');

class TaskController {
  constructor() {
    this.createTask = this.createTask.bind(this);
    this.findAll = this.findAll.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.taskService = new TaskService();
    this.roomService = new RoomService();
  }

  async findAll(req, res) {
    const room = await this.roomService.findById(req.params.id);
    res.status(200).json(room.tasks);
  }

  async createTask(req, res, next) {
    const { name } = req.body;
    try {
      const tasks = await this.taskService.createTask({ name }, req.params.id, req.userId);
      res.status(201).json(tasks);
    } catch (e) {
      next(e);
    }
  }

  async updateTask(req, res, next) {
    const { name } = req.body;
    try {
      const tasks = await this.taskService.updateTask(
        { name },
        req.params.taskId,
        req.params.id,
        req.userId,
      );
      res.status(200).json(tasks);
    } catch (e) {
      next(e);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const tasks = await this.taskService.deleteTask(req.params.taskId, req.params.id, req.userId);
      res.status(200).json(tasks);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TaskController();
