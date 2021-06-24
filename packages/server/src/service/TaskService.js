class TaskService {
  constructor() {
    this.createTask = this.createTask.bind(this);
  }

  async createTask(task, room) {
    room.tasks.push(task);
    const x = await room.save();
    console.log(x);
    return room.tasks;
  }
}

module.exports = TaskService;
