import { Schema, Types, model } from 'mongoose';
import { User } from '../auth/user';
import { Task, TaskSchema } from '../task/task';

export interface IRoom {
  name: string;
  owner: User;
  players: User[];
  tasks: Task[];
}

const RoomSchema = new Schema<IRoom>(
  {
    name: String,
    owner: { type: Types.ObjectId, ref: 'User' },
    players: [{ type: Types.ObjectId, ref: 'User' }],
    tasks: [TaskSchema],
  },
  { timestamps: true },
);

RoomSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model<IRoom>('Room', RoomSchema);
