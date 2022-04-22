const express = require('express');
const routerHomework  = express.Router();
const homework_controller = require('../controllers/homeworkController');


routerHomework.get('/', homework_controller.view);

routerHomework.post('/create', homework_controller.create);

routerHomework.get('/:id', homework_controller.filter);

routerHomework.delete('/delete/:id', homework_controller.delete);

module.exports = routerHomework;