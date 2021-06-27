'use strict';
const { body } = require('express-validator');
const { URL_LOGIN, URL_GET_USER_BY_ID, URL_REGISTER, URL_ROOMS } = require('@scrum-game/common');
const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const RoomController = require('../controllers/RoomController');
const TaskController = require('../controllers/TaskController');
const authVerify = require('../middleware/authVerify');
const validate = require('../middleware/validate');

// Auth routes
router.post(
  URL_LOGIN,
  [body('username').exists().isLength({ min: 3 }), body('password').exists().isLength({ min: 6 })],
  validate,
  AuthController.login,
);
router.post(
  URL_REGISTER,
  [body('username').exists().isLength({ min: 3 }), body('password').exists().isLength({ min: 6 })],
  validate,
  AuthController.register,
);
router.get(URL_GET_USER_BY_ID, AuthController.me);

// Room Routes
router.get(`${URL_ROOMS}/:id`, [authVerify], RoomController.find);
router.get(URL_ROOMS, [authVerify], RoomController.findAll);
router.post(URL_ROOMS, [authVerify], RoomController.create);
router.delete(`${URL_ROOMS}/:id`, [authVerify], RoomController.remove);
router.post(`${URL_ROOMS}/:id/join`, [authVerify], RoomController.joinChannel);
router.delete(`${URL_ROOMS}/:id/leave`, [authVerify], RoomController.leaveChannel);

// Task routes
router.get(`${URL_ROOMS}/:id/tasks`, [authVerify], TaskController.findAll);
router.post(`${URL_ROOMS}/:id/tasks`, [authVerify], TaskController.createTask);

module.exports = router;
