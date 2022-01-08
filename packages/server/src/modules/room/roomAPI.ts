import express from 'express';
import * as rooms from './roomController';

const router = express.Router();

router.get('/', rooms.all);
router.get('/:id', rooms.one);
router.post('/', rooms.create);
router.delete('/:id', rooms.removeRoom);
router.post('/:id/join', rooms.join);
router.delete('/:id/leave', rooms.leave);

export default router;
