const express = require('express');
const routerLesson  = express.Router();
const lesson_controller = require('../controllers/lessonController');
const jwtVerify = require('../utils/jwt')

const baseUrl = "/api/lessons"

routerLesson.get(baseUrl + '/', lesson_controller.view);

routerLesson.post(baseUrl + '/create', jwtVerify, lesson_controller.create);

routerLesson.delete(baseUrl + '/delete', jwtVerify, lesson_controller.delete);

module.exports = routerLesson;