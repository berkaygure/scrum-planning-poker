const Room = require("../models/Room");
const mongoose = require("mongoose");

class RoomService {
  constructor() {
    this.findById = this.findById.bind(this);
  }
  async findAll() {
    return await Room.find({})
      .populate("owner", "name")
      .populate("users", "name")
      .sort("-createdAt");
  }

  async findById(roomId) {
    const room = await Room.findById(roomId)
      .populate("owner", "name")
      .populate("users", "name");
    return room;
  }

  async joinToChannel(roomId, userId) {
    const room = await Room.findById(roomId);
    if (!room) {
      throw new Error("Room could not be found");
    }

    if (!room.users.includes(userId)) {
      room.users.push(userId);
    }
    await room.save();
    const savedRoom = await this.findById(roomId);
    return savedRoom;
  }

  async leaveChannel(roomId, userId) {
    const room = await Room.findById(roomId);
    if (!room) {
      throw new Error("Room could not be found");
    }
    const index = room.users.findIndex(x => x == userId)
    if (index > -1) {
      room.users.splice(index, 1);
    }
    await room.save();
    const savedRoom = await this.findById(roomId);
    return savedRoom;
  }

  async create(ownerId, name) {
    const room = new Room({
      name: name,
      owner: mongoose.Types.ObjectId(ownerId),
      users: [mongoose.Types.ObjectId(ownerId)],
    });
    const savedRoom = await room.save();

    return savedRoom;
  }

  async remove(roomId, ownerId) {
    await Room.deleteOne({
      owner: mongoose.Types.ObjectId(ownerId),
      _id: mongoose.Types.ObjectId(roomId),
    });
  }
}

module.exports = RoomService;
