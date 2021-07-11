const mongoose = require('mongoose');

const TaskScheme = new mongoose.Schema({
  name: String,
});

const RoomSchema = new mongoose.Schema(
  {
    name: String,
    owner: { type: mongoose.Types.ObjectId, ref: 'User' },
    tasks: [TaskScheme],
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Room', RoomSchema);
