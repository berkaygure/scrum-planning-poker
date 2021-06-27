const { UnauthorizedException, EntityDoesNotExists } = require('../exceptions');
const Room = require('../models/Room');

class TaskService {
  constructor() {
    this.createTask = this.createTask.bind(this);
  }

  /**
   * Creates a task and return whole tasks in the room
   * @param {*} task
   * @param {*} room
   * @returns
   */
  async createTask(task, roomId, userId) {
    const room = await Room.findById(roomId);

    if (!room) {
      throw new EntityDoesNotExists();
    }

    if (room.owner != userId) {
      throw new UnauthorizedException();
    }

    room.tasks.push(task);
    const savedRoom = await room.save();

    return savedRoom.tasks;
  }

  async deleteTask(taskId, roomId, userId) {
    const room = await Room.findById(roomId);

    if (!room) {
      throw new EntityDoesNotExists();
    }

    if (room.owner != userId) {
      throw new UnauthorizedException();
    }
    room.tasks = room.tasks.filter((x) => x._id != taskId);
    const savedRoom = await room.save();
    return savedRoom.tasks;
  }

  async updateTask(task, taskId, roomId, userId) {
    const room = await Room.findById(roomId);

    if (!room) {
      throw new EntityDoesNotExists();
    }

    if (room.owner != userId) {
      throw new UnauthorizedException();
    }

    room.tasks = room.tasks.map((x) => {
      if (x._id == taskId) {
        return task;
      }
      return x;
    });
    const savedRoom = await room.save();

    return savedRoom.tasks;
  }
}

module.exports = TaskService;
