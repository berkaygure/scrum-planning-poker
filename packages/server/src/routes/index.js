'use strict';
const { body, check } = require('express-validator');
const { URL_LOGIN, URL_GET_USER_BY_ID, URL_REGISTER, URL_ROOMS } = require('@scrum-game/common');
const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const RoomController = require('../controllers/RoomController');
const TaskController = require('../controllers/TaskController');
const authVerify = require('../middleware/authVerify');
const validate = require('../middleware/validate');

// Auth routes

const authValidationRules = [
  body('username')
    .exists()
    .withMessage('The username is required')
    .isLength({ min: 3 })
    .withMessage('Your username must be at least 3 characters'),
  body('password')
    .exists()
    .withMessage('The password is required')
    .isLength({ min: 6 })
    .withMessage('Your password must be at least 6 characters'),
];

router.post(URL_LOGIN, authValidationRules, validate, AuthController.login);
router.post(URL_REGISTER, authValidationRules, validate, AuthController.register);
router.get(URL_GET_USER_BY_ID, AuthController.me);

// Room Routes
router.get(`${URL_ROOMS}/:id`, [authVerify], RoomController.find);
router.get(URL_ROOMS, [authVerify], RoomController.findAll);
router.post(
  URL_ROOMS,
  [authVerify, body('name').exists().isLength({ min: 3 })],
  validate,
  RoomController.create,
);
router.delete(`${URL_ROOMS}/:id`, [authVerify], RoomController.remove);
router.post(`${URL_ROOMS}/:id/join`, [authVerify], RoomController.joinChannel);
router.delete(`${URL_ROOMS}/:id/leave`, [authVerify], RoomController.leaveChannel);

// Task routes
router.get(`${URL_ROOMS}/:id/tasks`, [authVerify], TaskController.findAll);
router.post(
  `${URL_ROOMS}/:id/tasks`,
  [authVerify, body('name').exists().isLength({ min: 3 })],
  validate,
  TaskController.createTask,
);
router.put(
  `${URL_ROOMS}/:id/tasks/:taskId`,
  [authVerify, body('name').exists().isLength({ min: 3 })],
  validate,
  TaskController.updateTask,
);
router.delete(`${URL_ROOMS}/:id/tasks/:taskId`, [authVerify], TaskController.deleteTask);

module.exports = router;
