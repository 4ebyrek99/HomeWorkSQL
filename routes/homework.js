const express = require('express');
const routerHomework  = express.Router();
const homework_controller = require('../controllers/homeworkController');
const jwtVerify = require('../utils/jwt')

const baseUrl = "/api/homework"


routerHomework.get(baseUrl + '/', homework_controller.view);

routerHomework.post(baseUrl + '/create', jwtVerify, homework_controller.create);

routerHomework.get(baseUrl + '/filter/:id', homework_controller.filter);

routerHomework.get(baseUrl + '/get/:id', homework_controller.get);

routerHomework.put(baseUrl + '/edit', jwtVerify, homework_controller.edit);

routerHomework.delete(baseUrl + '/delete/:id', jwtVerify, homework_controller.delete);

module.exports = routerHomework;