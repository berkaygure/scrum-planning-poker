const RoomService = require('../service/RoomService');

class RoomController {
  constructor() {
    this.roomService = new RoomService();
    this.findAll = this.findAll.bind(this);
    this.find = this.find.bind(this);
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.joinChannel = this.joinChannel.bind(this);
    this.leaveChannel = this.leaveChannel.bind(this);
  }

  async joinChannel(req, res) {
    try {
      const savedRoom = await this.roomService.joinToChannel(req.params.id, req.userId);
      res.status(201).json(savedRoom);
    } catch (e) {
      res.status(404).json({
        errors: [
          {
            resource_not_found: 'The resource could not be found',
          },
        ],
      });
    }
  }

  async leaveChannel(req, res) {
    try {
      const savedRoom = await this.roomService.leaveChannel(req.params.id, req.userId);
      res.status(200).json(savedRoom);
    } catch (e) {
      res.status(404).json({
        errors: [
          {
            resource_not_found: 'The resource could not be found',
          },
        ],
      });
    }
  }

  async create(req, res) {
    const savedRoom = await this.roomService.create(req.userId, req.body.name);
    res.status(201).json(savedRoom);
  }

  async find(req, res) {
    const room = await this.roomService.findById(req.params.id);
    res.json(room);
  }

  async findAll(req, res) {
    const rooms = await this.roomService.findAll();
    res.json(rooms);
  }

  async remove(req, res) {
    const deleted = await this.roomService.remove(req.params.id, req.userId);
    if (deleted) {
      res.status(204).json([]);
    } else {
      res.status(404).json({
        errors: [
          {
            resource_not_found: 'The resource could not be found',
          },
        ],
      });
    }
  }
}

module.exports = new RoomController();
