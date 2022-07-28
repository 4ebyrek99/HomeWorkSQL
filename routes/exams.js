const express = require('express');
const routerExams  = express.Router();
const exams_controller = require('../controllers/examsController');
const jwtVerify = require('../utils/jwt')

const baseUrl = "/api/exams"


routerExams.get(baseUrl + '/', exams_controller.view);

routerExams.post(baseUrl + '/create', jwtVerify, exams_controller.create);

routerExams.get(baseUrl + '/get/:id', exams_controller.get);

routerExams.put(baseUrl + '/edit', jwtVerify, exams_controller.edit);

routerExams.delete(baseUrl + '/delete/:id', jwtVerify, exams_controller.delete);

module.exports = routerExams;