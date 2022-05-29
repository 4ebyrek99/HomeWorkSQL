const express = require('express');
const routerLesson  = express.Router();
const lesson_controller = require('../controllers/lessonController');
const jwtVerify = require('../utils/jwt')

const baseUrl = "/api/lessons"

routerLesson.get(baseUrl + '/', lesson_controller.view);

routerLesson.post(baseUrl + '/create', jwtVerify, lesson_controller.create);

routerLesson.delete(baseUrl + '/delete/:id', jwtVerify, lesson_controller.delete);

routerLesson.put(baseUrl + '/edit', jwtVerify, lesson_controller.edit);

module.exports = routerLesson;