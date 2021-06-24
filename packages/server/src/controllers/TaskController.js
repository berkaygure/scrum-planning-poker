const RoomService = require('../service/RoomService');
const TaskService = require('../service/TaskService');

class TaskController {
  constructor() {
    this.createTask = this.createTask.bind(this);
    this.findAll = this.findAll.bind(this);
    this.taskService = new TaskService();
    this.roomService = new RoomService();
  }

  async findAll(req, res) {
    const room = await this.roomService.findById(req.params.id);
    res.status(201).json(room.tasks);
  }

  async createTask(req, res) {
    const room = await this.roomService.findById(req.params.id);
    const taskReq = {
      name: req.body.name,
    };
    const task = await this.taskService.createTask(taskReq, room);
    res.status(201).json(task);
  }
}

module.exports = new TaskController();
