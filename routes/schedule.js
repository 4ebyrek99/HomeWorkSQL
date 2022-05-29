const express = require('express');
const routerSchedule  = express.Router();
const schedule_controller = require('../controllers/scheduleController');
const jwtVerify = require('../utils/jwt')

const baseUrl = "/api/schedule"


routerSchedule.get(baseUrl + '/', schedule_controller.view);

routerSchedule.post(baseUrl + '/create', jwtVerify, schedule_controller.create);

routerSchedule.get(baseUrl + '/get/:id', schedule_controller.get);

routerSchedule.put(baseUrl + '/edit', jwtVerify, schedule_controller.edit);

routerSchedule.delete(baseUrl + '/delete/:id', jwtVerify, schedule_controller.delete);

module.exports = routerSchedule;