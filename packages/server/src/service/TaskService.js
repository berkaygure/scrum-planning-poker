const Room = require("../models/Room");
const RoomService = require("../RoomService");
const mongoose = require("mongoose");

class TaskService {
    constructor() {
      this.findAll = this.findAll.bind(this);
      this.roomService = new RoomService();
    }

    async createTask(name, roomId) {
        const room = await this.roomService.findById(roomId);
        room.tasks.push({
            name
            
        })
    }
}

module.exports = TaskService;