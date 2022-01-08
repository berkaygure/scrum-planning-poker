import { Schema, model } from 'mongoose';

export interface Task {
  name: string;
}

export const TaskSchema = new Schema<Task>({
  name: String,
});

export default model('Task', TaskSchema);
