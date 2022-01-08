import express from 'express';
import * as tasks from './taskController';

const router = express.Router();

router.get('/:id/tasks', tasks.getTasks);
router.post('/:id/tasks', tasks.createTask);
router.delete('/:id/tasks/:taskId', tasks.removeTask);

export default router;
