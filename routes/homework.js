const express = require('express');
const routerHomework  = express.Router();
const homework_controller = require('../controllers/homeworkController');


routerHomework.get('/', homework_controller.view);

routerHomework.post('/create', homework_controller.create);

routerHomework.post('/:id', homework_controller.viewByLesson);

//routerHomework.delete('/delete', homework_controller.deleteHomework);

//routerHomework.put('/change', homework_controller.change);

module.exports = routerHomework;