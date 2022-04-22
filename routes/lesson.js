const express = require('express');
const routerLesson  = express.Router();
const lesson_controller = require('../controllers/lessonController');


routerLesson.get('/', lesson_controller.view);

routerLesson.post('/create', lesson_controller.create);

routerLesson.delete('/delete', lesson_controller.delete);

module.exports = routerLesson;