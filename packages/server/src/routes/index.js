"use strict";
const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const RoomController = require("../controllers/RoomController");
const authVerify = require("../middleware/authVerify");

const {
  URL_LOGIN,
  URL_GET_USER_BY_ID,
  URL_REGISTER,
  URL_ROOMS,
} = require("../url");

// Auth routes
router.post(URL_LOGIN, AuthController.login);
router.post(URL_REGISTER, AuthController.register);
router.get(URL_GET_USER_BY_ID, AuthController.me);

// Room Routes
router.get(`${URL_ROOMS}/:id`, [authVerify], RoomController.find);
router.get(URL_ROOMS, [authVerify], RoomController.findAll);
router.post(URL_ROOMS, [authVerify], RoomController.create);
router.delete(`${URL_ROOMS}/:id`, [authVerify], RoomController.remove);
router.get(`${URL_ROOMS}/:id`, [authVerify], RoomController.find);
router.post(`${URL_ROOMS}/:id/join`, [authVerify], RoomController.joinChannel);
router.delete(`${URL_ROOMS}/:id/leave`, [authVerify], RoomController.leaveChannel);

module.exports = router;
